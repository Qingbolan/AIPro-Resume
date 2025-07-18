// Code generated by ent, DO NOT EDIT.

package ent

import (
	"fmt"
	"silan-backend/internal/ent/language"
	"strings"
	"time"

	"entgo.io/ent"
	"entgo.io/ent/dialect/sql"
)

// Language is the model entity for the Language schema.
type Language struct {
	config `json:"-"`
	// ID of the ent.
	ID string `json:"code"`
	// Name holds the value of the "name" field.
	Name string `json:"name,omitempty"`
	// NativeName holds the value of the "native_name" field.
	NativeName string `json:"native_name,omitempty"`
	// IsActive holds the value of the "is_active" field.
	IsActive bool `json:"is_active,omitempty"`
	// CreatedAt holds the value of the "created_at" field.
	CreatedAt time.Time `json:"created_at,omitempty"`
	// Edges holds the relations/edges for other nodes in the graph.
	// The values are being populated by the LanguageQuery when eager-loading is set.
	Edges        LanguageEdges `json:"edges"`
	selectValues sql.SelectValues
}

// LanguageEdges holds the relations/edges for other nodes in the graph.
type LanguageEdges struct {
	// PersonalInfoTranslations holds the value of the personal_info_translations edge.
	PersonalInfoTranslations []*PersonalInfoTranslation `json:"personal_info_translations,omitempty"`
	// EducationTranslations holds the value of the education_translations edge.
	EducationTranslations []*EducationTranslation `json:"education_translations,omitempty"`
	// EducationDetailTranslations holds the value of the education_detail_translations edge.
	EducationDetailTranslations []*EducationDetailTranslation `json:"education_detail_translations,omitempty"`
	// WorkExperienceTranslations holds the value of the work_experience_translations edge.
	WorkExperienceTranslations []*WorkExperienceTranslation `json:"work_experience_translations,omitempty"`
	// WorkExperienceDetailTranslations holds the value of the work_experience_detail_translations edge.
	WorkExperienceDetailTranslations []*WorkExperienceDetailTranslation `json:"work_experience_detail_translations,omitempty"`
	// ProjectTranslations holds the value of the project_translations edge.
	ProjectTranslations []*ProjectTranslation `json:"project_translations,omitempty"`
	// ProjectDetailTranslations holds the value of the project_detail_translations edge.
	ProjectDetailTranslations []*ProjectDetailTranslation `json:"project_detail_translations,omitempty"`
	// ProjectImageTranslations holds the value of the project_image_translations edge.
	ProjectImageTranslations []*ProjectImageTranslation `json:"project_image_translations,omitempty"`
	// BlogCategoryTranslations holds the value of the blog_category_translations edge.
	BlogCategoryTranslations []*BlogCategoryTranslation `json:"blog_category_translations,omitempty"`
	// BlogPostTranslations holds the value of the blog_post_translations edge.
	BlogPostTranslations []*BlogPostTranslation `json:"blog_post_translations,omitempty"`
	// BlogSeriesTranslations holds the value of the blog_series_translations edge.
	BlogSeriesTranslations []*BlogSeriesTranslation `json:"blog_series_translations,omitempty"`
	// IdeaTranslations holds the value of the idea_translations edge.
	IdeaTranslations []*IdeaTranslation `json:"idea_translations,omitempty"`
	// ResearchProjectTranslations holds the value of the research_project_translations edge.
	ResearchProjectTranslations []*ResearchProjectTranslation `json:"research_project_translations,omitempty"`
	// ResearchProjectDetailTranslations holds the value of the research_project_detail_translations edge.
	ResearchProjectDetailTranslations []*ResearchProjectDetailTranslation `json:"research_project_detail_translations,omitempty"`
	// PublicationTranslations holds the value of the publication_translations edge.
	PublicationTranslations []*PublicationTranslation `json:"publication_translations,omitempty"`
	// AwardTranslations holds the value of the award_translations edge.
	AwardTranslations []*AwardTranslation `json:"award_translations,omitempty"`
	// RecentUpdateTranslations holds the value of the recent_update_translations edge.
	RecentUpdateTranslations []*RecentUpdateTranslation `json:"recent_update_translations,omitempty"`
	// loadedTypes holds the information for reporting if a
	// type was loaded (or requested) in eager-loading or not.
	loadedTypes [17]bool
}

// PersonalInfoTranslationsOrErr returns the PersonalInfoTranslations value or an error if the edge
// was not loaded in eager-loading.
func (e LanguageEdges) PersonalInfoTranslationsOrErr() ([]*PersonalInfoTranslation, error) {
	if e.loadedTypes[0] {
		return e.PersonalInfoTranslations, nil
	}
	return nil, &NotLoadedError{edge: "personal_info_translations"}
}

// EducationTranslationsOrErr returns the EducationTranslations value or an error if the edge
// was not loaded in eager-loading.
func (e LanguageEdges) EducationTranslationsOrErr() ([]*EducationTranslation, error) {
	if e.loadedTypes[1] {
		return e.EducationTranslations, nil
	}
	return nil, &NotLoadedError{edge: "education_translations"}
}

// EducationDetailTranslationsOrErr returns the EducationDetailTranslations value or an error if the edge
// was not loaded in eager-loading.
func (e LanguageEdges) EducationDetailTranslationsOrErr() ([]*EducationDetailTranslation, error) {
	if e.loadedTypes[2] {
		return e.EducationDetailTranslations, nil
	}
	return nil, &NotLoadedError{edge: "education_detail_translations"}
}

// WorkExperienceTranslationsOrErr returns the WorkExperienceTranslations value or an error if the edge
// was not loaded in eager-loading.
func (e LanguageEdges) WorkExperienceTranslationsOrErr() ([]*WorkExperienceTranslation, error) {
	if e.loadedTypes[3] {
		return e.WorkExperienceTranslations, nil
	}
	return nil, &NotLoadedError{edge: "work_experience_translations"}
}

// WorkExperienceDetailTranslationsOrErr returns the WorkExperienceDetailTranslations value or an error if the edge
// was not loaded in eager-loading.
func (e LanguageEdges) WorkExperienceDetailTranslationsOrErr() ([]*WorkExperienceDetailTranslation, error) {
	if e.loadedTypes[4] {
		return e.WorkExperienceDetailTranslations, nil
	}
	return nil, &NotLoadedError{edge: "work_experience_detail_translations"}
}

// ProjectTranslationsOrErr returns the ProjectTranslations value or an error if the edge
// was not loaded in eager-loading.
func (e LanguageEdges) ProjectTranslationsOrErr() ([]*ProjectTranslation, error) {
	if e.loadedTypes[5] {
		return e.ProjectTranslations, nil
	}
	return nil, &NotLoadedError{edge: "project_translations"}
}

// ProjectDetailTranslationsOrErr returns the ProjectDetailTranslations value or an error if the edge
// was not loaded in eager-loading.
func (e LanguageEdges) ProjectDetailTranslationsOrErr() ([]*ProjectDetailTranslation, error) {
	if e.loadedTypes[6] {
		return e.ProjectDetailTranslations, nil
	}
	return nil, &NotLoadedError{edge: "project_detail_translations"}
}

// ProjectImageTranslationsOrErr returns the ProjectImageTranslations value or an error if the edge
// was not loaded in eager-loading.
func (e LanguageEdges) ProjectImageTranslationsOrErr() ([]*ProjectImageTranslation, error) {
	if e.loadedTypes[7] {
		return e.ProjectImageTranslations, nil
	}
	return nil, &NotLoadedError{edge: "project_image_translations"}
}

// BlogCategoryTranslationsOrErr returns the BlogCategoryTranslations value or an error if the edge
// was not loaded in eager-loading.
func (e LanguageEdges) BlogCategoryTranslationsOrErr() ([]*BlogCategoryTranslation, error) {
	if e.loadedTypes[8] {
		return e.BlogCategoryTranslations, nil
	}
	return nil, &NotLoadedError{edge: "blog_category_translations"}
}

// BlogPostTranslationsOrErr returns the BlogPostTranslations value or an error if the edge
// was not loaded in eager-loading.
func (e LanguageEdges) BlogPostTranslationsOrErr() ([]*BlogPostTranslation, error) {
	if e.loadedTypes[9] {
		return e.BlogPostTranslations, nil
	}
	return nil, &NotLoadedError{edge: "blog_post_translations"}
}

// BlogSeriesTranslationsOrErr returns the BlogSeriesTranslations value or an error if the edge
// was not loaded in eager-loading.
func (e LanguageEdges) BlogSeriesTranslationsOrErr() ([]*BlogSeriesTranslation, error) {
	if e.loadedTypes[10] {
		return e.BlogSeriesTranslations, nil
	}
	return nil, &NotLoadedError{edge: "blog_series_translations"}
}

// IdeaTranslationsOrErr returns the IdeaTranslations value or an error if the edge
// was not loaded in eager-loading.
func (e LanguageEdges) IdeaTranslationsOrErr() ([]*IdeaTranslation, error) {
	if e.loadedTypes[11] {
		return e.IdeaTranslations, nil
	}
	return nil, &NotLoadedError{edge: "idea_translations"}
}

// ResearchProjectTranslationsOrErr returns the ResearchProjectTranslations value or an error if the edge
// was not loaded in eager-loading.
func (e LanguageEdges) ResearchProjectTranslationsOrErr() ([]*ResearchProjectTranslation, error) {
	if e.loadedTypes[12] {
		return e.ResearchProjectTranslations, nil
	}
	return nil, &NotLoadedError{edge: "research_project_translations"}
}

// ResearchProjectDetailTranslationsOrErr returns the ResearchProjectDetailTranslations value or an error if the edge
// was not loaded in eager-loading.
func (e LanguageEdges) ResearchProjectDetailTranslationsOrErr() ([]*ResearchProjectDetailTranslation, error) {
	if e.loadedTypes[13] {
		return e.ResearchProjectDetailTranslations, nil
	}
	return nil, &NotLoadedError{edge: "research_project_detail_translations"}
}

// PublicationTranslationsOrErr returns the PublicationTranslations value or an error if the edge
// was not loaded in eager-loading.
func (e LanguageEdges) PublicationTranslationsOrErr() ([]*PublicationTranslation, error) {
	if e.loadedTypes[14] {
		return e.PublicationTranslations, nil
	}
	return nil, &NotLoadedError{edge: "publication_translations"}
}

// AwardTranslationsOrErr returns the AwardTranslations value or an error if the edge
// was not loaded in eager-loading.
func (e LanguageEdges) AwardTranslationsOrErr() ([]*AwardTranslation, error) {
	if e.loadedTypes[15] {
		return e.AwardTranslations, nil
	}
	return nil, &NotLoadedError{edge: "award_translations"}
}

// RecentUpdateTranslationsOrErr returns the RecentUpdateTranslations value or an error if the edge
// was not loaded in eager-loading.
func (e LanguageEdges) RecentUpdateTranslationsOrErr() ([]*RecentUpdateTranslation, error) {
	if e.loadedTypes[16] {
		return e.RecentUpdateTranslations, nil
	}
	return nil, &NotLoadedError{edge: "recent_update_translations"}
}

// scanValues returns the types for scanning values from sql.Rows.
func (*Language) scanValues(columns []string) ([]any, error) {
	values := make([]any, len(columns))
	for i := range columns {
		switch columns[i] {
		case language.FieldIsActive:
			values[i] = new(sql.NullBool)
		case language.FieldID, language.FieldName, language.FieldNativeName:
			values[i] = new(sql.NullString)
		case language.FieldCreatedAt:
			values[i] = new(sql.NullTime)
		default:
			values[i] = new(sql.UnknownType)
		}
	}
	return values, nil
}

// assignValues assigns the values that were returned from sql.Rows (after scanning)
// to the Language fields.
func (l *Language) assignValues(columns []string, values []any) error {
	if m, n := len(values), len(columns); m < n {
		return fmt.Errorf("mismatch number of scan values: %d != %d", m, n)
	}
	for i := range columns {
		switch columns[i] {
		case language.FieldID:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field id", values[i])
			} else if value.Valid {
				l.ID = value.String
			}
		case language.FieldName:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field name", values[i])
			} else if value.Valid {
				l.Name = value.String
			}
		case language.FieldNativeName:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field native_name", values[i])
			} else if value.Valid {
				l.NativeName = value.String
			}
		case language.FieldIsActive:
			if value, ok := values[i].(*sql.NullBool); !ok {
				return fmt.Errorf("unexpected type %T for field is_active", values[i])
			} else if value.Valid {
				l.IsActive = value.Bool
			}
		case language.FieldCreatedAt:
			if value, ok := values[i].(*sql.NullTime); !ok {
				return fmt.Errorf("unexpected type %T for field created_at", values[i])
			} else if value.Valid {
				l.CreatedAt = value.Time
			}
		default:
			l.selectValues.Set(columns[i], values[i])
		}
	}
	return nil
}

// Value returns the ent.Value that was dynamically selected and assigned to the Language.
// This includes values selected through modifiers, order, etc.
func (l *Language) Value(name string) (ent.Value, error) {
	return l.selectValues.Get(name)
}

// QueryPersonalInfoTranslations queries the "personal_info_translations" edge of the Language entity.
func (l *Language) QueryPersonalInfoTranslations() *PersonalInfoTranslationQuery {
	return NewLanguageClient(l.config).QueryPersonalInfoTranslations(l)
}

// QueryEducationTranslations queries the "education_translations" edge of the Language entity.
func (l *Language) QueryEducationTranslations() *EducationTranslationQuery {
	return NewLanguageClient(l.config).QueryEducationTranslations(l)
}

// QueryEducationDetailTranslations queries the "education_detail_translations" edge of the Language entity.
func (l *Language) QueryEducationDetailTranslations() *EducationDetailTranslationQuery {
	return NewLanguageClient(l.config).QueryEducationDetailTranslations(l)
}

// QueryWorkExperienceTranslations queries the "work_experience_translations" edge of the Language entity.
func (l *Language) QueryWorkExperienceTranslations() *WorkExperienceTranslationQuery {
	return NewLanguageClient(l.config).QueryWorkExperienceTranslations(l)
}

// QueryWorkExperienceDetailTranslations queries the "work_experience_detail_translations" edge of the Language entity.
func (l *Language) QueryWorkExperienceDetailTranslations() *WorkExperienceDetailTranslationQuery {
	return NewLanguageClient(l.config).QueryWorkExperienceDetailTranslations(l)
}

// QueryProjectTranslations queries the "project_translations" edge of the Language entity.
func (l *Language) QueryProjectTranslations() *ProjectTranslationQuery {
	return NewLanguageClient(l.config).QueryProjectTranslations(l)
}

// QueryProjectDetailTranslations queries the "project_detail_translations" edge of the Language entity.
func (l *Language) QueryProjectDetailTranslations() *ProjectDetailTranslationQuery {
	return NewLanguageClient(l.config).QueryProjectDetailTranslations(l)
}

// QueryProjectImageTranslations queries the "project_image_translations" edge of the Language entity.
func (l *Language) QueryProjectImageTranslations() *ProjectImageTranslationQuery {
	return NewLanguageClient(l.config).QueryProjectImageTranslations(l)
}

// QueryBlogCategoryTranslations queries the "blog_category_translations" edge of the Language entity.
func (l *Language) QueryBlogCategoryTranslations() *BlogCategoryTranslationQuery {
	return NewLanguageClient(l.config).QueryBlogCategoryTranslations(l)
}

// QueryBlogPostTranslations queries the "blog_post_translations" edge of the Language entity.
func (l *Language) QueryBlogPostTranslations() *BlogPostTranslationQuery {
	return NewLanguageClient(l.config).QueryBlogPostTranslations(l)
}

// QueryBlogSeriesTranslations queries the "blog_series_translations" edge of the Language entity.
func (l *Language) QueryBlogSeriesTranslations() *BlogSeriesTranslationQuery {
	return NewLanguageClient(l.config).QueryBlogSeriesTranslations(l)
}

// QueryIdeaTranslations queries the "idea_translations" edge of the Language entity.
func (l *Language) QueryIdeaTranslations() *IdeaTranslationQuery {
	return NewLanguageClient(l.config).QueryIdeaTranslations(l)
}

// QueryResearchProjectTranslations queries the "research_project_translations" edge of the Language entity.
func (l *Language) QueryResearchProjectTranslations() *ResearchProjectTranslationQuery {
	return NewLanguageClient(l.config).QueryResearchProjectTranslations(l)
}

// QueryResearchProjectDetailTranslations queries the "research_project_detail_translations" edge of the Language entity.
func (l *Language) QueryResearchProjectDetailTranslations() *ResearchProjectDetailTranslationQuery {
	return NewLanguageClient(l.config).QueryResearchProjectDetailTranslations(l)
}

// QueryPublicationTranslations queries the "publication_translations" edge of the Language entity.
func (l *Language) QueryPublicationTranslations() *PublicationTranslationQuery {
	return NewLanguageClient(l.config).QueryPublicationTranslations(l)
}

// QueryAwardTranslations queries the "award_translations" edge of the Language entity.
func (l *Language) QueryAwardTranslations() *AwardTranslationQuery {
	return NewLanguageClient(l.config).QueryAwardTranslations(l)
}

// QueryRecentUpdateTranslations queries the "recent_update_translations" edge of the Language entity.
func (l *Language) QueryRecentUpdateTranslations() *RecentUpdateTranslationQuery {
	return NewLanguageClient(l.config).QueryRecentUpdateTranslations(l)
}

// Update returns a builder for updating this Language.
// Note that you need to call Language.Unwrap() before calling this method if this Language
// was returned from a transaction, and the transaction was committed or rolled back.
func (l *Language) Update() *LanguageUpdateOne {
	return NewLanguageClient(l.config).UpdateOne(l)
}

// Unwrap unwraps the Language entity that was returned from a transaction after it was closed,
// so that all future queries will be executed through the driver which created the transaction.
func (l *Language) Unwrap() *Language {
	_tx, ok := l.config.driver.(*txDriver)
	if !ok {
		panic("ent: Language is not a transactional entity")
	}
	l.config.driver = _tx.drv
	return l
}

// String implements the fmt.Stringer.
func (l *Language) String() string {
	var builder strings.Builder
	builder.WriteString("Language(")
	builder.WriteString(fmt.Sprintf("id=%v, ", l.ID))
	builder.WriteString("name=")
	builder.WriteString(l.Name)
	builder.WriteString(", ")
	builder.WriteString("native_name=")
	builder.WriteString(l.NativeName)
	builder.WriteString(", ")
	builder.WriteString("is_active=")
	builder.WriteString(fmt.Sprintf("%v", l.IsActive))
	builder.WriteString(", ")
	builder.WriteString("created_at=")
	builder.WriteString(l.CreatedAt.Format(time.ANSIC))
	builder.WriteByte(')')
	return builder.String()
}

// Languages is a parsable slice of Language.
type Languages []*Language
