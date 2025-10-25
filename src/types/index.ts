// Core data types for the home renovation app

export interface Project {
  id: string;
  name: string;
  address: string;
  startDate: Date;
  targetEndDate?: Date;
  status: ProjectStatus;
  totalBudget: number;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum ProjectStatus {
  PLANNING = 'planning',
  IN_PROGRESS = 'in_progress',
  ON_HOLD = 'on_hold',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export interface Task {
  id: string;
  projectId: string;
  name: string;
  description?: string;
  status: TaskStatus;
  assignedTo?: string;
  dueDate?: Date;
  dependencies: string[];
  estimatedCost: number;
  actualCost: number;
  createdAt: Date;
  updatedAt: Date;
}

export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  BLOCKED = 'blocked',
}

export interface Expense {
  id: string;
  projectId: string;
  taskId?: string;
  category: ExpenseCategory;
  amount: number;
  date: Date;
  vendor: string;
  receiptImageUrl?: string;
  paymentMethod: PaymentMethod;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum ExpenseCategory {
  MATERIALS = 'materials',
  LABOR = 'labor',
  PERMITS = 'permits',
  TOOLS = 'tools',
  UTILITIES = 'utilities',
  OTHER = 'other',
}

export enum PaymentMethod {
  CASH = 'cash',
  CARD = 'card',
  BANK_TRANSFER = 'bank_transfer',
  CHECK = 'check',
  OTHER = 'other',
}

export interface Document {
  id: string;
  projectId: string;
  name: string;
  type: DocumentType;
  fileUrl: string;
  uploadedDate: Date;
  tags: string[];
}

export enum DocumentType {
  RECEIPT = 'receipt',
  INVOICE = 'invoice',
  PERMIT = 'permit',
  CONTRACT = 'contract',
  PHOTO = 'photo',
  OTHER = 'other',
}

export interface Photo {
  id: string;
  projectId: string;
  taskId?: string;
  fileUrl: string;
  caption?: string;
  takenDate: Date;
  tags: string[];
  location?: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Notion API types
export interface NotionProject {
  id: string;
  properties: {
    Name: { title: Array<{ plain_text: string }> };
    Address: { rich_text: Array<{ plain_text: string }> };
    Status: { select: { name: string } };
    'Total Budget': { number: number };
    'Start Date': { date: { start: string } };
    'Target End Date': { date: { start: string } };
  };
}

export interface NotionTask {
  id: string;
  properties: {
    Name: { title: Array<{ plain_text: string }> };
    Description: { rich_text: Array<{ plain_text: string }> };
    Status: { select: { name: string } };
    'Due Date': { date: { start: string } };
    'Estimated Cost': { number: number };
    'Actual Cost': { number: number };
    Project: { relation: Array<{ id: string }> };
  };
}

export interface NotionExpense {
  id: string;
  properties: {
    Amount: { number: number };
    Category: { select: { name: string } };
    Date: { date: { start: string } };
    Vendor: { rich_text: Array<{ plain_text: string }> };
    'Payment Method': { select: { name: string } };
    Notes: { rich_text: Array<{ plain_text: string }> };
    Project: { relation: Array<{ id: string }> };
    Task: { relation: Array<{ id: string }> };
  };
}

// UI State types
export interface AppState {
  projects: Project[];
  currentProject?: Project;
  tasks: Task[];
  expenses: Expense[];
  isLoading: boolean;
  error?: string;
}

export interface BudgetSummary {
  totalBudget: number;
  totalSpent: number;
  remaining: number;
  percentageSpent: number;
  isOverBudget: boolean;
  categoryBreakdown: {
    category: ExpenseCategory;
    amount: number;
    percentage: number;
  }[];
}
