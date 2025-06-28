export interface BlogContent {
  type: 'text' | 'image' | 'video' | 'code' | 'quote';
  content: string;
  caption?: string;
  language?: string; // for code blocks
  annotation?: string;
  id: string;
}

export interface BlogData {
  id: string;
  title: string;
  titleZh?: string;
  author: string;
  publishDate: string;
  readTime: string;
  category: string;
  tags: string[];
  content: BlogContent[];
  likes: number;
  views: number;
  summary: string;
  summaryZh?: string;
}

export interface Comment {
  id: number;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
}

export interface UserAnnotation {
  text: string;
  selectedText: string;
  startOffset: number;
  endOffset: number;
}

export interface Section {
  id: string;
  title: string;
  level: number;
}

export interface SelectedText {
  text: string;
  contentId: string;
  startOffset: number;
  endOffset: number;
} 