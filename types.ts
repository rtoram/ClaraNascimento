export interface FirecrawlOptions {
  url: string;
  onlyMainContent: boolean;
  maxAge: number;
  parsers: string[];
  formats: string[];
}

export interface FirecrawlResponse {
  success: boolean;
  data?: {
    markdown?: string;
    metadata?: Record<string, any>;
    content?: string;
  };
  error?: string;
}

export interface ProjectReference {
  name: string;
  year?: string;
  location?: string;
  description?: string;
}

export interface AnalysisResult {
  summary: string;
  keyInsights: string[];
  entities: string[];
  suggestedActions: string[];
  imageUrlReferences?: string[];
  projects?: ProjectReference[];
}

export enum AppStatus {
  IDLE = 'IDLE',
  SCRAPING = 'ANALISANDO_WEB',
  ANALYZING = 'GERANDO_ESTUDO',
  SUCCESS = 'CONCLUIDO',
  ERROR = 'ERRO'
}