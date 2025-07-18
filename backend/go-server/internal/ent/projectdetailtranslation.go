// Code generated by ent, DO NOT EDIT.

package ent

import (
	"fmt"
	"silan-backend/internal/ent/language"
	"silan-backend/internal/ent/projectdetail"
	"silan-backend/internal/ent/projectdetailtranslation"
	"strings"
	"time"

	"entgo.io/ent"
	"entgo.io/ent/dialect/sql"
	"github.com/google/uuid"
)

// ProjectDetailTranslation is the model entity for the ProjectDetailTranslation schema.
type ProjectDetailTranslation struct {
	config `json:"-"`
	// ID of the ent.
	ID uuid.UUID `json:"id,omitempty"`
	// ProjectDetailID holds the value of the "project_detail_id" field.
	ProjectDetailID uuid.UUID `json:"project_detail_id,omitempty"`
	// LanguageCode holds the value of the "language_code" field.
	LanguageCode string `json:"language_code,omitempty"`
	// DetailedDescription holds the value of the "detailed_description" field.
	DetailedDescription string `json:"detailed_description,omitempty"`
	// Goals holds the value of the "goals" field.
	Goals string `json:"goals,omitempty"`
	// Challenges holds the value of the "challenges" field.
	Challenges string `json:"challenges,omitempty"`
	// Solutions holds the value of the "solutions" field.
	Solutions string `json:"solutions,omitempty"`
	// LessonsLearned holds the value of the "lessons_learned" field.
	LessonsLearned string `json:"lessons_learned,omitempty"`
	// FutureEnhancements holds the value of the "future_enhancements" field.
	FutureEnhancements string `json:"future_enhancements,omitempty"`
	// CreatedAt holds the value of the "created_at" field.
	CreatedAt time.Time `json:"created_at,omitempty"`
	// Edges holds the relations/edges for other nodes in the graph.
	// The values are being populated by the ProjectDetailTranslationQuery when eager-loading is set.
	Edges        ProjectDetailTranslationEdges `json:"edges"`
	selectValues sql.SelectValues
}

// ProjectDetailTranslationEdges holds the relations/edges for other nodes in the graph.
type ProjectDetailTranslationEdges struct {
	// ProjectDetail holds the value of the project_detail edge.
	ProjectDetail *ProjectDetail `json:"project_detail,omitempty"`
	// Language holds the value of the language edge.
	Language *Language `json:"language,omitempty"`
	// loadedTypes holds the information for reporting if a
	// type was loaded (or requested) in eager-loading or not.
	loadedTypes [2]bool
}

// ProjectDetailOrErr returns the ProjectDetail value or an error if the edge
// was not loaded in eager-loading, or loaded but was not found.
func (e ProjectDetailTranslationEdges) ProjectDetailOrErr() (*ProjectDetail, error) {
	if e.ProjectDetail != nil {
		return e.ProjectDetail, nil
	} else if e.loadedTypes[0] {
		return nil, &NotFoundError{label: projectdetail.Label}
	}
	return nil, &NotLoadedError{edge: "project_detail"}
}

// LanguageOrErr returns the Language value or an error if the edge
// was not loaded in eager-loading, or loaded but was not found.
func (e ProjectDetailTranslationEdges) LanguageOrErr() (*Language, error) {
	if e.Language != nil {
		return e.Language, nil
	} else if e.loadedTypes[1] {
		return nil, &NotFoundError{label: language.Label}
	}
	return nil, &NotLoadedError{edge: "language"}
}

// scanValues returns the types for scanning values from sql.Rows.
func (*ProjectDetailTranslation) scanValues(columns []string) ([]any, error) {
	values := make([]any, len(columns))
	for i := range columns {
		switch columns[i] {
		case projectdetailtranslation.FieldLanguageCode, projectdetailtranslation.FieldDetailedDescription, projectdetailtranslation.FieldGoals, projectdetailtranslation.FieldChallenges, projectdetailtranslation.FieldSolutions, projectdetailtranslation.FieldLessonsLearned, projectdetailtranslation.FieldFutureEnhancements:
			values[i] = new(sql.NullString)
		case projectdetailtranslation.FieldCreatedAt:
			values[i] = new(sql.NullTime)
		case projectdetailtranslation.FieldID, projectdetailtranslation.FieldProjectDetailID:
			values[i] = new(uuid.UUID)
		default:
			values[i] = new(sql.UnknownType)
		}
	}
	return values, nil
}

// assignValues assigns the values that were returned from sql.Rows (after scanning)
// to the ProjectDetailTranslation fields.
func (pdt *ProjectDetailTranslation) assignValues(columns []string, values []any) error {
	if m, n := len(values), len(columns); m < n {
		return fmt.Errorf("mismatch number of scan values: %d != %d", m, n)
	}
	for i := range columns {
		switch columns[i] {
		case projectdetailtranslation.FieldID:
			if value, ok := values[i].(*uuid.UUID); !ok {
				return fmt.Errorf("unexpected type %T for field id", values[i])
			} else if value != nil {
				pdt.ID = *value
			}
		case projectdetailtranslation.FieldProjectDetailID:
			if value, ok := values[i].(*uuid.UUID); !ok {
				return fmt.Errorf("unexpected type %T for field project_detail_id", values[i])
			} else if value != nil {
				pdt.ProjectDetailID = *value
			}
		case projectdetailtranslation.FieldLanguageCode:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field language_code", values[i])
			} else if value.Valid {
				pdt.LanguageCode = value.String
			}
		case projectdetailtranslation.FieldDetailedDescription:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field detailed_description", values[i])
			} else if value.Valid {
				pdt.DetailedDescription = value.String
			}
		case projectdetailtranslation.FieldGoals:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field goals", values[i])
			} else if value.Valid {
				pdt.Goals = value.String
			}
		case projectdetailtranslation.FieldChallenges:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field challenges", values[i])
			} else if value.Valid {
				pdt.Challenges = value.String
			}
		case projectdetailtranslation.FieldSolutions:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field solutions", values[i])
			} else if value.Valid {
				pdt.Solutions = value.String
			}
		case projectdetailtranslation.FieldLessonsLearned:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field lessons_learned", values[i])
			} else if value.Valid {
				pdt.LessonsLearned = value.String
			}
		case projectdetailtranslation.FieldFutureEnhancements:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field future_enhancements", values[i])
			} else if value.Valid {
				pdt.FutureEnhancements = value.String
			}
		case projectdetailtranslation.FieldCreatedAt:
			if value, ok := values[i].(*sql.NullTime); !ok {
				return fmt.Errorf("unexpected type %T for field created_at", values[i])
			} else if value.Valid {
				pdt.CreatedAt = value.Time
			}
		default:
			pdt.selectValues.Set(columns[i], values[i])
		}
	}
	return nil
}

// Value returns the ent.Value that was dynamically selected and assigned to the ProjectDetailTranslation.
// This includes values selected through modifiers, order, etc.
func (pdt *ProjectDetailTranslation) Value(name string) (ent.Value, error) {
	return pdt.selectValues.Get(name)
}

// QueryProjectDetail queries the "project_detail" edge of the ProjectDetailTranslation entity.
func (pdt *ProjectDetailTranslation) QueryProjectDetail() *ProjectDetailQuery {
	return NewProjectDetailTranslationClient(pdt.config).QueryProjectDetail(pdt)
}

// QueryLanguage queries the "language" edge of the ProjectDetailTranslation entity.
func (pdt *ProjectDetailTranslation) QueryLanguage() *LanguageQuery {
	return NewProjectDetailTranslationClient(pdt.config).QueryLanguage(pdt)
}

// Update returns a builder for updating this ProjectDetailTranslation.
// Note that you need to call ProjectDetailTranslation.Unwrap() before calling this method if this ProjectDetailTranslation
// was returned from a transaction, and the transaction was committed or rolled back.
func (pdt *ProjectDetailTranslation) Update() *ProjectDetailTranslationUpdateOne {
	return NewProjectDetailTranslationClient(pdt.config).UpdateOne(pdt)
}

// Unwrap unwraps the ProjectDetailTranslation entity that was returned from a transaction after it was closed,
// so that all future queries will be executed through the driver which created the transaction.
func (pdt *ProjectDetailTranslation) Unwrap() *ProjectDetailTranslation {
	_tx, ok := pdt.config.driver.(*txDriver)
	if !ok {
		panic("ent: ProjectDetailTranslation is not a transactional entity")
	}
	pdt.config.driver = _tx.drv
	return pdt
}

// String implements the fmt.Stringer.
func (pdt *ProjectDetailTranslation) String() string {
	var builder strings.Builder
	builder.WriteString("ProjectDetailTranslation(")
	builder.WriteString(fmt.Sprintf("id=%v, ", pdt.ID))
	builder.WriteString("project_detail_id=")
	builder.WriteString(fmt.Sprintf("%v", pdt.ProjectDetailID))
	builder.WriteString(", ")
	builder.WriteString("language_code=")
	builder.WriteString(pdt.LanguageCode)
	builder.WriteString(", ")
	builder.WriteString("detailed_description=")
	builder.WriteString(pdt.DetailedDescription)
	builder.WriteString(", ")
	builder.WriteString("goals=")
	builder.WriteString(pdt.Goals)
	builder.WriteString(", ")
	builder.WriteString("challenges=")
	builder.WriteString(pdt.Challenges)
	builder.WriteString(", ")
	builder.WriteString("solutions=")
	builder.WriteString(pdt.Solutions)
	builder.WriteString(", ")
	builder.WriteString("lessons_learned=")
	builder.WriteString(pdt.LessonsLearned)
	builder.WriteString(", ")
	builder.WriteString("future_enhancements=")
	builder.WriteString(pdt.FutureEnhancements)
	builder.WriteString(", ")
	builder.WriteString("created_at=")
	builder.WriteString(pdt.CreatedAt.Format(time.ANSIC))
	builder.WriteByte(')')
	return builder.String()
}

// ProjectDetailTranslations is a parsable slice of ProjectDetailTranslation.
type ProjectDetailTranslations []*ProjectDetailTranslation
