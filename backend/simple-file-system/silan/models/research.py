"""Research-related models: projects, publications, and awards"""

from datetime import date
from decimal import Decimal
from typing import Optional, List

from sqlalchemy import String, Text, Date, Boolean, Integer, Numeric, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import Base, TimestampMixin, UUID, generate_uuid


class ResearchProject(Base, TimestampMixin):
    """Research project model"""
    __tablename__ = "research_projects"

    id: Mapped[str] = mapped_column(UUID, primary_key=True, default=generate_uuid)
    user_id: Mapped[str] = mapped_column(UUID, ForeignKey("users.id"), nullable=False)
    title: Mapped[str] = mapped_column(String(300), nullable=False)
    start_date: Mapped[Optional[date]] = mapped_column(Date)
    end_date: Mapped[Optional[date]] = mapped_column(Date)
    is_ongoing: Mapped[bool] = mapped_column(Boolean, default=False)
    location: Mapped[Optional[str]] = mapped_column(String(200))
    research_type: Mapped[Optional[str]] = mapped_column(String(50))  # individual, collaboration, funded, etc.
    funding_source: Mapped[Optional[str]] = mapped_column(String(200))
    funding_amount: Mapped[Optional[Decimal]] = mapped_column(Numeric(12, 2))
    sort_order: Mapped[int] = mapped_column(Integer, default=0)

    # Relationships
    user: Mapped["User"] = relationship(back_populates="research_projects")
    translations: Mapped[List["ResearchProjectTranslation"]] = relationship(back_populates="research_project", cascade="all, delete-orphan")
    details: Mapped[List["ResearchProjectDetail"]] = relationship(back_populates="research_project", cascade="all, delete-orphan")


class ResearchProjectTranslation(Base, TimestampMixin):
    """Research project translations"""
    __tablename__ = "research_project_translations"

    id: Mapped[str] = mapped_column(UUID, primary_key=True, default=generate_uuid)
    research_project_id: Mapped[str] = mapped_column(UUID, ForeignKey("research_projects.id"), nullable=False)
    language_code: Mapped[str] = mapped_column(String(5), ForeignKey("languages.code"), nullable=False)
    title: Mapped[str] = mapped_column(String(300), nullable=False)
    location: Mapped[Optional[str]] = mapped_column(String(200))
    research_type: Mapped[Optional[str]] = mapped_column(String(50))
    funding_source: Mapped[Optional[str]] = mapped_column(String(200))

    # Relationships
    research_project: Mapped["ResearchProject"] = relationship(back_populates="translations")
    language: Mapped["Language"] = relationship()

    __table_args__ = (
        {"mysql_charset": "utf8mb4", "mysql_collate": "utf8mb4_unicode_ci"},
    )


class ResearchProjectDetail(Base, TimestampMixin):
    """Research project detail items"""
    __tablename__ = "research_project_details"

    id: Mapped[str] = mapped_column(UUID, primary_key=True, default=generate_uuid)
    research_project_id: Mapped[str] = mapped_column(UUID, ForeignKey("research_projects.id"), nullable=False)
    detail_text: Mapped[str] = mapped_column(Text, nullable=False)
    sort_order: Mapped[int] = mapped_column(Integer, default=0)

    # Relationships
    research_project: Mapped["ResearchProject"] = relationship(back_populates="details")
    translations: Mapped[List["ResearchProjectDetailTranslation"]] = relationship(back_populates="research_project_detail", cascade="all, delete-orphan")


class ResearchProjectDetailTranslation(Base, TimestampMixin):
    """Research project detail translations"""
    __tablename__ = "research_project_detail_translations"

    id: Mapped[str] = mapped_column(UUID, primary_key=True, default=generate_uuid)
    research_project_detail_id: Mapped[str] = mapped_column(UUID, ForeignKey("research_project_details.id"), nullable=False)
    language_code: Mapped[str] = mapped_column(String(5), ForeignKey("languages.code"), nullable=False)
    detail_text: Mapped[str] = mapped_column(Text, nullable=False)

    # Relationships
    research_project_detail: Mapped["ResearchProjectDetail"] = relationship(back_populates="translations")
    language: Mapped["Language"] = relationship()

    __table_args__ = (
        {"mysql_charset": "utf8mb4", "mysql_collate": "utf8mb4_unicode_ci"},
    )


class Publication(Base, TimestampMixin):
    """Publication model"""
    __tablename__ = "publications"

    id: Mapped[str] = mapped_column(UUID, primary_key=True, default=generate_uuid)
    user_id: Mapped[str] = mapped_column(UUID, ForeignKey("users.id"), nullable=False)
    title: Mapped[str] = mapped_column(String(500), nullable=False)
    publication_type: Mapped[str] = mapped_column(String(50), nullable=False)  # journal, conference, book, chapter, etc.
    journal_name: Mapped[Optional[str]] = mapped_column(String(200))
    conference_name: Mapped[Optional[str]] = mapped_column(String(200))
    volume: Mapped[Optional[str]] = mapped_column(String(20))
    issue: Mapped[Optional[str]] = mapped_column(String(20))
    pages: Mapped[Optional[str]] = mapped_column(String(50))
    publication_date: Mapped[Optional[date]] = mapped_column(Date)
    doi: Mapped[Optional[str]] = mapped_column(String(100))
    isbn: Mapped[Optional[str]] = mapped_column(String(20))
    url: Mapped[Optional[str]] = mapped_column(String(500))
    pdf_url: Mapped[Optional[str]] = mapped_column(String(500))
    citation_count: Mapped[int] = mapped_column(Integer, default=0)
    is_peer_reviewed: Mapped[bool] = mapped_column(Boolean, default=False)
    sort_order: Mapped[int] = mapped_column(Integer, default=0)

    # Relationships
    user: Mapped["User"] = relationship(back_populates="publications")
    translations: Mapped[List["PublicationTranslation"]] = relationship(back_populates="publication", cascade="all, delete-orphan")
    authors: Mapped[List["PublicationAuthor"]] = relationship(back_populates="publication", cascade="all, delete-orphan")


class PublicationTranslation(Base, TimestampMixin):
    """Publication translations"""
    __tablename__ = "publication_translations"

    id: Mapped[str] = mapped_column(UUID, primary_key=True, default=generate_uuid)
    publication_id: Mapped[str] = mapped_column(UUID, ForeignKey("publications.id"), nullable=False)
    language_code: Mapped[str] = mapped_column(String(5), ForeignKey("languages.code"), nullable=False)
    title: Mapped[str] = mapped_column(String(500), nullable=False)
    journal_name: Mapped[Optional[str]] = mapped_column(String(200))
    conference_name: Mapped[Optional[str]] = mapped_column(String(200))

    # Relationships
    publication: Mapped["Publication"] = relationship(back_populates="translations")
    language: Mapped["Language"] = relationship()

    __table_args__ = (
        {"mysql_charset": "utf8mb4", "mysql_collate": "utf8mb4_unicode_ci"},
    )


class PublicationAuthor(Base, TimestampMixin):
    """Publication authors"""
    __tablename__ = "publication_authors"

    id: Mapped[str] = mapped_column(UUID, primary_key=True, default=generate_uuid)
    publication_id: Mapped[str] = mapped_column(UUID, ForeignKey("publications.id"), nullable=False)
    author_name: Mapped[str] = mapped_column(String(200), nullable=False)
    author_order: Mapped[int] = mapped_column(Integer, nullable=False)
    is_corresponding: Mapped[bool] = mapped_column(Boolean, default=False)
    affiliation: Mapped[Optional[str]] = mapped_column(String(300))

    # Relationships
    publication: Mapped["Publication"] = relationship(back_populates="authors")


class Award(Base, TimestampMixin):
    """Award and achievement model"""
    __tablename__ = "awards"

    id: Mapped[str] = mapped_column(UUID, primary_key=True, default=generate_uuid)
    user_id: Mapped[str] = mapped_column(UUID, ForeignKey("users.id"), nullable=False)
    title: Mapped[str] = mapped_column(String(300), nullable=False)
    awarding_organization: Mapped[str] = mapped_column(String(200), nullable=False)
    award_date: Mapped[Optional[date]] = mapped_column(Date)
    award_type: Mapped[Optional[str]] = mapped_column(String(50))  # scholarship, recognition, competition, etc.
    amount: Mapped[Optional[Decimal]] = mapped_column(Numeric(12, 2))
    description: Mapped[Optional[str]] = mapped_column(Text)
    certificate_url: Mapped[Optional[str]] = mapped_column(String(500))
    sort_order: Mapped[int] = mapped_column(Integer, default=0)

    # Relationships
    user: Mapped["User"] = relationship(back_populates="awards")
    translations: Mapped[List["AwardTranslation"]] = relationship(back_populates="award", cascade="all, delete-orphan")


class AwardTranslation(Base, TimestampMixin):
    """Award translations"""
    __tablename__ = "award_translations"

    id: Mapped[str] = mapped_column(UUID, primary_key=True, default=generate_uuid)
    award_id: Mapped[str] = mapped_column(UUID, ForeignKey("awards.id"), nullable=False)
    language_code: Mapped[str] = mapped_column(String(5), ForeignKey("languages.code"), nullable=False)
    title: Mapped[str] = mapped_column(String(300), nullable=False)
    awarding_organization: Mapped[str] = mapped_column(String(200), nullable=False)
    award_type: Mapped[Optional[str]] = mapped_column(String(50))
    description: Mapped[Optional[str]] = mapped_column(Text)

    # Relationships
    award: Mapped["Award"] = relationship(back_populates="translations")
    language: Mapped["Language"] = relationship()

    __table_args__ = (
        {"mysql_charset": "utf8mb4", "mysql_collate": "utf8mb4_unicode_ci"},
    ) 