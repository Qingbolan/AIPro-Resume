"""
SQLAlchemy models for Silan Personal Website

This module contains all the database models that mirror the content structure
described in the design documents.
"""

from .base import Base, TimestampMixin, UUID, generate_uuid
from .user import User, Language, PersonalInfo, PersonalInfoTranslation, SocialLink
from .education import Education, EducationTranslation, EducationDetail, EducationDetailTranslation
from .experience import WorkExperience, WorkExperienceTranslation, WorkExperienceDetail, WorkExperienceDetailTranslation
from .projects import (
    Project, ProjectTranslation, ProjectDetail, ProjectDetailTranslation,
    ProjectTechnology, ProjectImage, ProjectImageTranslation, ProjectRelationship
)
from .blog import (
    BlogPost, BlogPostTranslation, BlogCategory, BlogCategoryTranslation,
    BlogTag, BlogPostTag, BlogSeries, BlogSeriesTranslation, BlogComment
)
from .ideas import Idea, IdeaTranslation
from .research import (
    ResearchProject, ResearchProjectTranslation, ResearchProjectDetail,
    ResearchProjectDetailTranslation, Publication, PublicationTranslation,
    PublicationAuthor, Award, AwardTranslation
)

__all__ = [
    # Base
    'Base', 'TimestampMixin', 'UUID', 'generate_uuid',
    
    # User & Profile
    'User', 'Language', 'PersonalInfo', 'PersonalInfoTranslation', 'SocialLink',
    
    # Education
    'Education', 'EducationTranslation', 'EducationDetail', 'EducationDetailTranslation',
    
    # Experience
    'WorkExperience', 'WorkExperienceTranslation', 'WorkExperienceDetail', 'WorkExperienceDetailTranslation',
    
    # Projects
    'Project', 'ProjectTranslation', 'ProjectDetail', 'ProjectDetailTranslation',
    'ProjectTechnology', 'ProjectImage', 'ProjectImageTranslation', 'ProjectRelationship',
    
    # Blog
    'BlogPost', 'BlogPostTranslation', 'BlogCategory', 'BlogCategoryTranslation',
    'BlogTag', 'BlogPostTag', 'BlogSeries', 'BlogSeriesTranslation', 'BlogComment',
    
    # Ideas
    'Idea', 'IdeaTranslation',
    
    # Research
    'ResearchProject', 'ResearchProjectTranslation', 'ResearchProjectDetail',
    'ResearchProjectDetailTranslation', 'Publication', 'PublicationTranslation',
    'PublicationAuthor', 'Award', 'AwardTranslation'
]