// Notion API integration for home renovation app
import { NotionProject, NotionTask, NotionExpense } from '@/types';

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

const NOTION_API_URL = 'https://api.notion.com/v1';

interface NotionApiResponse {
  results: any[];
  has_more: boolean;
  next_cursor?: string;
}

class NotionApiClient {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.baseUrl = NOTION_API_URL;
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`Notion API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Projects
  async getProjects(): Promise<NotionProject[]> {
    const response = await this.makeRequest(`/databases/${NOTION_DATABASE_ID}/query`, {
      method: 'POST',
      body: JSON.stringify({
        filter: {
          property: 'Status',
          select: {
            does_not_equal: 'Archived'
          }
        },
        sorts: [
          {
            property: 'Start Date',
            direction: 'descending'
          }
        ]
      })
    });

    return response.results;
  }

  async createProject(project: {
    name: string;
    address: string;
    totalBudget: number;
    startDate: string;
    targetEndDate?: string;
  }): Promise<NotionProject> {
    const response = await this.makeRequest('/pages', {
      method: 'POST',
      body: JSON.stringify({
        parent: { database_id: NOTION_DATABASE_ID },
        properties: {
          Name: {
            title: [{ text: { content: project.name } }]
          },
          Address: {
            rich_text: [{ text: { content: project.address } }]
          },
          'Total Budget': {
            number: project.totalBudget
          },
          'Start Date': {
            date: { start: project.startDate }
          },
          'Target End Date': project.targetEndDate ? {
            date: { start: project.targetEndDate }
          } : undefined,
          Status: {
            select: { name: 'Planning' }
          }
        }
      })
    });

    return response;
  }

  async updateProject(projectId: string, updates: Partial<{
    name: string;
    address: string;
    totalBudget: number;
    status: string;
    targetEndDate: string;
  }>): Promise<NotionProject> {
    const properties: any = {};

    if (updates.name) {
      properties.Name = { title: [{ text: { content: updates.name } }] };
    }
    if (updates.address) {
      properties.Address = { rich_text: [{ text: { content: updates.address } }] };
    }
    if (updates.totalBudget !== undefined) {
      properties['Total Budget'] = { number: updates.totalBudget };
    }
    if (updates.status) {
      properties.Status = { select: { name: updates.status } };
    }
    if (updates.targetEndDate) {
      properties['Target End Date'] = { date: { start: updates.targetEndDate } };
    }

    const response = await this.makeRequest(`/pages/${projectId}`, {
      method: 'PATCH',
      body: JSON.stringify({ properties })
    });

    return response;
  }

  // Tasks
  async getTasks(projectId?: string): Promise<NotionTask[]> {
    const filter: any = {};
    if (projectId) {
      filter.property = 'Project';
      filter.relation = { contains: projectId };
    }

    const response = await this.makeRequest(`/databases/${NOTION_DATABASE_ID}/query`, {
      method: 'POST',
      body: JSON.stringify({
        filter,
        sorts: [
          {
            property: 'Due Date',
            direction: 'ascending'
          }
        ]
      })
    });

    return response.results;
  }

  async createTask(task: {
    name: string;
    description?: string;
    projectId: string;
    dueDate?: string;
    estimatedCost: number;
  }): Promise<NotionTask> {
    const response = await this.makeRequest('/pages', {
      method: 'POST',
      body: JSON.stringify({
        parent: { database_id: NOTION_DATABASE_ID },
        properties: {
          Name: {
            title: [{ text: { content: task.name } }]
          },
          Description: task.description ? {
            rich_text: [{ text: { content: task.description } }]
          } : undefined,
          Project: {
            relation: [{ id: task.projectId }]
          },
          'Due Date': task.dueDate ? {
            date: { start: task.dueDate }
          } : undefined,
          'Estimated Cost': {
            number: task.estimatedCost
          },
          'Actual Cost': {
            number: 0
          },
          Status: {
            select: { name: 'To Do' }
          }
        }
      })
    });

    return response;
  }

  // Expenses
  async getExpenses(projectId?: string): Promise<NotionExpense[]> {
    const filter: any = {};
    if (projectId) {
      filter.property = 'Project';
      filter.relation = { contains: projectId };
    }

    const response = await this.makeRequest(`/databases/${NOTION_DATABASE_ID}/query`, {
      method: 'POST',
      body: JSON.stringify({
        filter,
        sorts: [
          {
            property: 'Date',
            direction: 'descending'
          }
        ]
      })
    });

    return response.results;
  }

  async createExpense(expense: {
    amount: number;
    category: string;
    date: string;
    vendor: string;
    paymentMethod: string;
    notes?: string;
    projectId: string;
    taskId?: string;
  }): Promise<NotionExpense> {
    const response = await this.makeRequest('/pages', {
      method: 'POST',
      body: JSON.stringify({
        parent: { database_id: NOTION_DATABASE_ID },
        properties: {
          Amount: {
            number: expense.amount
          },
          Category: {
            select: { name: expense.category }
          },
          Date: {
            date: { start: expense.date }
          },
          Vendor: {
            rich_text: [{ text: { content: expense.vendor } }]
          },
          'Payment Method': {
            select: { name: expense.paymentMethod }
          },
          Notes: expense.notes ? {
            rich_text: [{ text: { content: expense.notes } }]
          } : undefined,
          Project: {
            relation: [{ id: expense.projectId }]
          },
          Task: expense.taskId ? {
            relation: [{ id: expense.taskId }]
          } : undefined
        }
      })
    });

    return response;
  }

  // Utility methods
  async searchPages(query: string): Promise<any[]> {
    const response = await this.makeRequest('/search', {
      method: 'POST',
      body: JSON.stringify({
        query,
        filter: {
          property: 'object',
          value: 'page'
        }
      })
    });

    return response.results;
  }
}

// Export singleton instance
export const notionClient = new NotionApiClient(NOTION_API_KEY || '');

// Helper functions for data transformation
export function transformNotionProject(notionProject: NotionProject) {
  return {
    id: notionProject.id,
    name: notionProject.properties.Name.title[0]?.plain_text || '',
    address: notionProject.properties.Address.rich_text[0]?.plain_text || '',
    status: notionProject.properties.Status.select.name,
    totalBudget: notionProject.properties['Total Budget'].number || 0,
    startDate: new Date(notionProject.properties['Start Date'].date.start),
    targetEndDate: notionProject.properties['Target End Date']?.date?.start 
      ? new Date(notionProject.properties['Target End Date'].date.start)
      : undefined,
  };
}

export function transformNotionTask(notionTask: NotionTask) {
  return {
    id: notionTask.id,
    name: notionTask.properties.Name.title[0]?.plain_text || '',
    description: notionTask.properties.Description?.rich_text[0]?.plain_text || '',
    status: notionTask.properties.Status.select.name,
    dueDate: notionTask.properties['Due Date']?.date?.start 
      ? new Date(notionTask.properties['Due Date'].date.start)
      : undefined,
    estimatedCost: notionTask.properties['Estimated Cost'].number || 0,
    actualCost: notionTask.properties['Actual Cost'].number || 0,
    projectId: notionTask.properties.Project.relation[0]?.id || '',
  };
}

export function transformNotionExpense(notionExpense: NotionExpense) {
  return {
    id: notionExpense.id,
    amount: notionExpense.properties.Amount.number,
    category: notionExpense.properties.Category.select.name,
    date: new Date(notionExpense.properties.Date.date.start),
    vendor: notionExpense.properties.Vendor.rich_text[0]?.plain_text || '',
    paymentMethod: notionExpense.properties['Payment Method'].select.name,
    notes: notionExpense.properties.Notes?.rich_text[0]?.plain_text || '',
    projectId: notionExpense.properties.Project.relation[0]?.id || '',
    taskId: notionExpense.properties.Task?.relation[0]?.id,
  };
}
