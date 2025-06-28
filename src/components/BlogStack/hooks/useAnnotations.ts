import { useState } from 'react';
import { UserAnnotation, SelectedText } from '../types/blog';

export const useAnnotations = () => {
  const [userAnnotations, setUserAnnotations] = useState<Record<string, UserAnnotation>>({});
  const [showAnnotationForm, setShowAnnotationForm] = useState<string | null>(null);
  const [newAnnotationText, setNewAnnotationText] = useState('');
  const [selectedText, setSelectedText] = useState<SelectedText | null>(null);
  const [highlightedAnnotation, setHighlightedAnnotation] = useState<string | null>(null);

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim()) {
      const selectedText = selection.toString().trim();
      const range = selection.getRangeAt(0);
      const parentElement = range.commonAncestorContainer.parentElement;
      
      // Find the content ID from the parent elements
      let element = parentElement;
      let contentId = '';
      while (element && !contentId) {
        contentId = element.id;
        element = element.parentElement;
      }
      
      if (contentId) {
        // Calculate text offsets for precise positioning
        const containerElement = document.getElementById(contentId);
        if (containerElement) {
          const containerText = containerElement.textContent || '';
          const startOffset = containerText.indexOf(selectedText);
          const endOffset = startOffset + selectedText.length;
          
          setSelectedText({ 
            text: selectedText, 
            contentId, 
            startOffset,
            endOffset
          });
          setShowAnnotationForm(contentId);
        }
      }
    }
  };

  const addUserAnnotation = (contentId: string) => {
    if (newAnnotationText.trim() && selectedText) {
      const annotationId = `${contentId}-${Date.now()}`;
      setUserAnnotations(prev => ({
        ...prev,
        [annotationId]: {
          text: newAnnotationText.trim(),
          selectedText: selectedText.text,
          startOffset: selectedText.startOffset,
          endOffset: selectedText.endOffset
        }
      }));
      setNewAnnotationText('');
      setShowAnnotationForm(null);
      setSelectedText(null);
    }
  };

  const removeUserAnnotation = (annotationId: string) => {
    setUserAnnotations(prev => {
      const newAnnotations = { ...prev };
      delete newAnnotations[annotationId];
      return newAnnotations;
    });
  };

  const highlightAnnotation = (annotationId: string) => {
    setHighlightedAnnotation(annotationId);
    setTimeout(() => setHighlightedAnnotation(null), 2000);
  };

  const cancelAnnotation = () => {
    setShowAnnotationForm(null);
    setNewAnnotationText('');
    setSelectedText(null);
  };

  return {
    userAnnotations,
    showAnnotationForm,
    newAnnotationText,
    selectedText,
    highlightedAnnotation,
    setNewAnnotationText,
    setShowAnnotationForm,
    handleTextSelection,
    addUserAnnotation,
    removeUserAnnotation,
    highlightAnnotation,
    cancelAnnotation
  };
}; 