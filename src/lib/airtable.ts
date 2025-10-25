// Airtable API integration for home renovation app (MVP data storage)
import Airtable from 'airtable';

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;

if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
  throw new Error('Airtable API key and Base ID must be provided');
}

const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID);

// Table names
const TABLES = {
  PROJECTS: 'Projects',
  TASKS: 'Tasks',
  EXPENSES: 'Expenses',
  DOCUMENTS: 'Documents',
  PHOTOS: 'Photos',
} as const;

export class AirtableApiClient {
  // Projects
  async getProjects(): Promise<any[]> {
    const records = await base(TABLES.PROJECTS)
      .select({
        sort: [{ field: 'Start Date', direction: 'desc' }],
        filterByFormula: "NOT({Status} = 'Archived')"
      })
      .all();

    return records.map(record => ({
      id: record.id,
      ...record.fields,
      createdAt: record.createdTime,
    }));
  }

  async createProject(project: {
    Name: string;
    Address: string;
    'Total Budget': number;
    'Start Date': string;
    'Target End Date'?: string;
    Status?: string;
  }): Promise<any> {
    const record = await base(TABLES.PROJECTS).create({
      Name: project.Name,
      Address: project.Address,
      'Total Budget': project.Total Budget,
      'Start Date': project.Start Date,
      'Target End Date': project.Target End Date,
      Status: project.Status || 'Planning',
    });

    return {
      id: record.id,
      ...record.fields,
      createdAt: record.createdTime,
    };
  }

  async updateProject(projectId: string, updates: Record<string, any>): Promise<any> {
    const record = await base(TABLES.PROJECTS).update(projectId, updates);
    return {
      id: record.id,
      ...record.fields,
      createdAt: record.createdTime,
    };
  }

  // Tasks
  async getTasks(projectId?: string): Promise<any[]> {
    const filterFormula = projectId 
      ? `AND(NOT({Status} = 'Archived'), {Project} = '${projectId}')`
      : "NOT({Status} = 'Archived')";

    const records = await base(TABLES.TASKS)
      .select({
        sort: [{ field: 'Due Date', direction: 'asc' }],
        filterByFormula: filterFormula
      })
      .all();

    return records.map(record => ({
      id: record.id,
      ...record.fields,
      createdAt: record.createdTime,
    }));
  }

  async createTask(task: {
    Name: string;
    Description?: string;
    Project: string[];
    'Due Date'?: string;
    'Estimated Cost': number;
    'Actual Cost'?: number;
    Status?: string;
  }): Promise<any> {
    const record = await base(TABLES.TASKS).create({
      Name: task.Name,
      Description: task.Description,
      Project: task.Project,
      'Due Date': task.Due Date,
      'Estimated Cost': task.Estimated Cost,
      'Actual Cost': task.Actual Cost || 0,
      Status: task.Status || 'To Do',
    });

    return {
      id: record.id,
      ...record.fields,
      createdAt: record.createdTime,
    };
  }

  async updateTask(taskId: string, updates: Record<string, any>): Promise<any> {
    const record = await base(TABLES.TASKS).update(taskId, updates);
    return {
      id: record.id,
      ...record.fields,
      createdAt: record.createdTime,
    };
  }

  // Expenses
  async getExpenses(projectId?: string): Promise<any[]> {
    const filterFormula = projectId 
      ? `{Project} = '${projectId}'`
      : 'TRUE()';

    const records = await base(TABLES.EXPENSES)
      .select({
        sort: [{ field: 'Date', direction: 'desc' }],
        filterByFormula: filterFormula
      })
      .all();

    return records.map(record => ({
      id: record.id,
      ...record.fields,
      createdAt: record.createdTime,
    }));
  }

  async createExpense(expense: {
    Amount: number;
    Category: string;
    Date: string;
    Vendor: string;
    'Payment Method': string;
    Notes?: string;
    Project: string[];
    Task?: string[];
  }): Promise<any> {
    const record = await base(TABLES.EXPENSES).create({
      Amount: expense.Amount,
      Category: expense.Category,
      Date: expense.Date,
      Vendor: expense.Vendor,
      'Payment Method': expense.Payment Method,
      Notes: expense.Notes,
      Project: expense.Project,
      Task: expense.Task,
    });

    return {
      id: record.id,
      ...record.fields,
      createdAt: record.createdTime,
    };
  }

  async updateExpense(expenseId: string, updates: Record<string, any>): Promise<any> {
    const record = await base(TABLES.EXPENSES).update(expenseId, updates);
    return {
      id: record.id,
      ...record.fields,
      createdAt: record.createdTime,
    };
  }

  // Documents
  async getDocuments(projectId?: string): Promise<any[]> {
    const filterFormula = projectId 
      ? `{Project} = '${projectId}'`
      : 'TRUE()';

    const records = await base(TABLES.DOCUMENTS)
      .select({
        sort: [{ field: 'Uploaded Date', direction: 'desc' }],
        filterByFormula: filterFormula
      })
      .all();

    return records.map(record => ({
      id: record.id,
      ...record.fields,
      createdAt: record.createdTime,
    }));
  }

  async createDocument(document: {
    Name: string;
    Type: string;
    'File URL': string;
    'Uploaded Date': string;
    Tags?: string[];
    Project: string[];
  }): Promise<any> {
    const record = await base(TABLES.DOCUMENTS).create({
      Name: document.Name,
      Type: document.Type,
      'File URL': document.File URL,
      'Uploaded Date': document.Uploaded Date,
      Tags: document.Tags || [],
      Project: document.Project,
    });

    return {
      id: record.id,
      ...record.fields,
      createdAt: record.createdTime,
    };
  }

  // Photos
  async getPhotos(projectId?: string, taskId?: string): Promise<any[]> {
    let filterFormula = 'TRUE()';
    if (projectId && taskId) {
      filterFormula = `AND({Project} = '${projectId}', {Task} = '${taskId}')`;
    } else if (projectId) {
      filterFormula = `{Project} = '${projectId}'`;
    } else if (taskId) {
      filterFormula = `{Task} = '${taskId}'`;
    }

    const records = await base(TABLES.PHOTOS)
      .select({
        sort: [{ field: 'Taken Date', direction: 'desc' }],
        filterByFormula: filterFormula
      })
      .all();

    return records.map(record => ({
      id: record.id,
      ...record.fields,
      createdAt: record.createdTime,
    }));
  }

  async createPhoto(photo: {
    'File URL': string;
    Caption?: string;
    'Taken Date': string;
    Tags?: string[];
    Location?: string;
    Project: string[];
    Task?: string[];
  }): Promise<any> {
    const record = await base(TABLES.PHOTOS).create({
      'File URL': photo.File URL,
      Caption: photo.Caption,
      'Taken Date': photo.Taken Date,
      Tags: photo.Tags || [],
      Location: photo.Location,
      Project: photo.Project,
      Task: photo.Task,
    });

    return {
      id: record.id,
      ...record.fields,
      createdAt: record.createdTime,
    };
  }

  // Utility methods
  async searchRecords(tableName: string, searchTerm: string): Promise<any[]> {
    const records = await base(tableName)
      .select({
        filterByFormula: `SEARCH('${searchTerm}', {Name})`
      })
      .all();

    return records.map(record => ({
      id: record.id,
      ...record.fields,
      createdAt: record.createdTime,
    }));
  }

  async getRecordById(tableName: string, recordId: string): Promise<any> {
    const record = await base(tableName).find(recordId);
    return {
      id: record.id,
      ...record.fields,
      createdAt: record.createdTime,
    };
  }
}

// Export singleton instance
export const airtableClient = new AirtableApiClient();

// Helper functions for data transformation
export function transformAirtableProject(airtableProject: any) {
  return {
    id: airtableProject.id,
    name: airtableProject.Name || '',
    address: airtableProject.Address || '',
    status: airtableProject.Status || 'planning',
    totalBudget: airtableProject['Total Budget'] || 0,
    startDate: new Date(airtableProject['Start Date']),
    targetEndDate: airtableProject['Target End Date'] 
      ? new Date(airtableProject['Target End Date'])
      : undefined,
    createdAt: new Date(airtableProject.createdAt),
  };
}

export function transformAirtableTask(airtableTask: any) {
  return {
    id: airtableTask.id,
    name: airtableTask.Name || '',
    description: airtableTask.Description || '',
    status: airtableTask.Status || 'todo',
    dueDate: airtableTask['Due Date'] 
      ? new Date(airtableTask['Due Date'])
      : undefined,
    estimatedCost: airtableTask['Estimated Cost'] || 0,
    actualCost: airtableTask['Actual Cost'] || 0,
    projectId: airtableTask.Project?.[0] || '',
    createdAt: new Date(airtableTask.createdAt),
  };
}

export function transformAirtableExpense(airtableExpense: any) {
  return {
    id: airtableExpense.id,
    amount: airtableExpense.Amount || 0,
    category: airtableExpense.Category || 'other',
    date: new Date(airtableExpense.Date),
    vendor: airtableExpense.Vendor || '',
    paymentMethod: airtableExpense['Payment Method'] || 'cash',
    notes: airtableExpense.Notes || '',
    projectId: airtableExpense.Project?.[0] || '',
    taskId: airtableExpense.Task?.[0],
    createdAt: new Date(airtableExpense.createdAt),
  };
}
