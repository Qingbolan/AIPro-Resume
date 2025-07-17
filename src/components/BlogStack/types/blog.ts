import { ReactNode } from 'react';

export interface BlogContent {
  id: string;
  type: 'text' | 'image' | 'video' | 'quote' | 'code';
  content: string;
  metadata?: Record<string, any>;
  children?: ReactNode;
}

export interface BlogData {
  id: string;
  title: string;
  titleZh?: string;
  slug?: string;
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
  type?: 'article' | 'vlog' | 'tutorial' | 'podcast' | 'episode';
  // Vlog specific fields
  videoUrl?: string;
  videoDuration?: string;
  videoThumbnail?: string;
  vlogCover?: string; // Vlog cover image for display
  // Series specific fields
  seriesId?: string;
  seriesTitle?: string;
  seriesTitleZh?: string;
  seriesDescription?: string;
  seriesDescriptionZh?: string;
  episodeNumber?: number;
  totalEpisodes?: number;
  seriesImage?: string;
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