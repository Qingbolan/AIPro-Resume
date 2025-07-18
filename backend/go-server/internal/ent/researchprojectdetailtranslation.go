// Code generated by ent, DO NOT EDIT.

package ent

import (
	"fmt"
	"silan-backend/internal/ent/language"
	"silan-backend/internal/ent/researchprojectdetail"
	"silan-backend/internal/ent/researchprojectdetailtranslation"
	"strings"
	"time"

	"entgo.io/ent"
	"entgo.io/ent/dialect/sql"
	"github.com/google/uuid"
)

// ResearchProjectDetailTranslation is the model entity for the ResearchProjectDetailTranslation schema.
type ResearchProjectDetailTranslation struct {
	config `json:"-"`
	// ID of the ent.
	ID uuid.UUID `json:"id,omitempty"`
	// ResearchProjectDetailID holds the value of the "research_project_detail_id" field.
	ResearchProjectDetailID uuid.UUID `json:"research_project_detail_id,omitempty"`
	// LanguageCode holds the value of the "language_code" field.
	LanguageCode string `json:"language_code,omitempty"`
	// DetailText holds the value of the "detail_text" field.
	DetailText string `json:"detail_text,omitempty"`
	// CreatedAt holds the value of the "created_at" field.
	CreatedAt time.Time `json:"created_at,omitempty"`
	// Edges holds the relations/edges for other nodes in the graph.
	// The values are being populated by the ResearchProjectDetailTranslationQuery when eager-loading is set.
	Edges        ResearchProjectDetailTranslationEdges `json:"edges"`
	selectValues sql.SelectValues
}

// ResearchProjectDetailTranslationEdges holds the relations/edges for other nodes in the graph.
type ResearchProjectDetailTranslationEdges struct {
	// ResearchProjectDetail holds the value of the research_project_detail edge.
	ResearchProjectDetail *ResearchProjectDetail `json:"research_project_detail,omitempty"`
	// Language holds the value of the language edge.
	Language *Language `json:"language,omitempty"`
	// loadedTypes holds the information for reporting if a
	// type was loaded (or requested) in eager-loading or not.
	loadedTypes [2]bool
}

// ResearchProjectDetailOrErr returns the ResearchProjectDetail value or an error if the edge
// was not loaded in eager-loading, or loaded but was not found.
func (e ResearchProjectDetailTranslationEdges) ResearchProjectDetailOrErr() (*ResearchProjectDetail, error) {
	if e.ResearchProjectDetail != nil {
		return e.ResearchProjectDetail, nil
	} else if e.loadedTypes[0] {
		return nil, &NotFoundError{label: researchprojectdetail.Label}
	}
	return nil, &NotLoadedError{edge: "research_project_detail"}
}

// LanguageOrErr returns the Language value or an error if the edge
// was not loaded in eager-loading, or loaded but was not found.
func (e ResearchProjectDetailTranslationEdges) LanguageOrErr() (*Language, error) {
	if e.Language != nil {
		return e.Language, nil
	} else if e.loadedTypes[1] {
		return nil, &NotFoundError{label: language.Label}
	}
	return nil, &NotLoadedError{edge: "language"}
}

// scanValues returns the types for scanning values from sql.Rows.
func (*ResearchProjectDetailTranslation) scanValues(columns []string) ([]any, error) {
	values := make([]any, len(columns))
	for i := range columns {
		switch columns[i] {
		case researchprojectdetailtranslation.FieldLanguageCode, researchprojectdetailtranslation.FieldDetailText:
			values[i] = new(sql.NullString)
		case researchprojectdetailtranslation.FieldCreatedAt:
			values[i] = new(sql.NullTime)
		case researchprojectdetailtranslation.FieldID, researchprojectdetailtranslation.FieldResearchProjectDetailID:
			values[i] = new(uuid.UUID)
		default:
			values[i] = new(sql.UnknownType)
		}
	}
	return values, nil
}

// assignValues assigns the values that were returned from sql.Rows (after scanning)
// to the ResearchProjectDetailTranslation fields.
func (rpdt *ResearchProjectDetailTranslation) assignValues(columns []string, values []any) error {
	if m, n := len(values), len(columns); m < n {
		return fmt.Errorf("mismatch number of scan values: %d != %d", m, n)
	}
	for i := range columns {
		switch columns[i] {
		case researchprojectdetailtranslation.FieldID:
			if value, ok := values[i].(*uuid.UUID); !ok {
				return fmt.Errorf("unexpected type %T for field id", values[i])
			} else if value != nil {
				rpdt.ID = *value
			}
		case researchprojectdetailtranslation.FieldResearchProjectDetailID:
			if value, ok := values[i].(*uuid.UUID); !ok {
				return fmt.Errorf("unexpected type %T for field research_project_detail_id", values[i])
			} else if value != nil {
				rpdt.ResearchProjectDetailID = *value
			}
		case researchprojectdetailtranslation.FieldLanguageCode:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field language_code", values[i])
			} else if value.Valid {
				rpdt.LanguageCode = value.String
			}
		case researchprojectdetailtranslation.FieldDetailText:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field detail_text", values[i])
			} else if value.Valid {
				rpdt.DetailText = value.String
			}
		case researchprojectdetailtranslation.FieldCreatedAt:
			if value, ok := values[i].(*sql.NullTime); !ok {
				return fmt.Errorf("unexpected type %T for field created_at", values[i])
			} else if value.Valid {
				rpdt.CreatedAt = value.Time
			}
		default:
			rpdt.selectValues.Set(columns[i], values[i])
		}
	}
	return nil
}

// Value returns the ent.Value that was dynamically selected and assigned to the ResearchProjectDetailTranslation.
// This includes values selected through modifiers, order, etc.
func (rpdt *ResearchProjectDetailTranslation) Value(name string) (ent.Value, error) {
	return rpdt.selectValues.Get(name)
}

// QueryResearchProjectDetail queries the "research_project_detail" edge of the ResearchProjectDetailTranslation entity.
func (rpdt *ResearchProjectDetailTranslation) QueryResearchProjectDetail() *ResearchProjectDetailQuery {
	return NewResearchProjectDetailTranslationClient(rpdt.config).QueryResearchProjectDetail(rpdt)
}

// QueryLanguage queries the "language" edge of the ResearchProjectDetailTranslation entity.
func (rpdt *ResearchProjectDetailTranslation) QueryLanguage() *LanguageQuery {
	return NewResearchProjectDetailTranslationClient(rpdt.config).QueryLanguage(rpdt)
}

// Update returns a builder for updating this ResearchProjectDetailTranslation.
// Note that you need to call ResearchProjectDetailTranslation.Unwrap() before calling this method if this ResearchProjectDetailTranslation
// was returned from a transaction, and the transaction was committed or rolled back.
func (rpdt *ResearchProjectDetailTranslation) Update() *ResearchProjectDetailTranslationUpdateOne {
	return NewResearchProjectDetailTranslationClient(rpdt.config).UpdateOne(rpdt)
}

// Unwrap unwraps the ResearchProjectDetailTranslation entity that was returned from a transaction after it was closed,
// so that all future queries will be executed through the driver which created the transaction.
func (rpdt *ResearchProjectDetailTranslation) Unwrap() *ResearchProjectDetailTranslation {
	_tx, ok := rpdt.config.driver.(*txDriver)
	if !ok {
		panic("ent: ResearchProjectDetailTranslation is not a transactional entity")
	}
	rpdt.config.driver = _tx.drv
	return rpdt
}

// String implements the fmt.Stringer.
func (rpdt *ResearchProjectDetailTranslation) String() string {
	var builder strings.Builder
	builder.WriteString("ResearchProjectDetailTranslation(")
	builder.WriteString(fmt.Sprintf("id=%v, ", rpdt.ID))
	builder.WriteString("research_project_detail_id=")
	builder.WriteString(fmt.Sprintf("%v", rpdt.ResearchProjectDetailID))
	builder.WriteString(", ")
	builder.WriteString("language_code=")
	builder.WriteString(rpdt.LanguageCode)
	builder.WriteString(", ")
	builder.WriteString("detail_text=")
	builder.WriteString(rpdt.DetailText)
	builder.WriteString(", ")
	builder.WriteString("created_at=")
	builder.WriteString(rpdt.CreatedAt.Format(time.ANSIC))
	builder.WriteByte(')')
	return builder.String()
}

// ResearchProjectDetailTranslations is a parsable slice of ResearchProjectDetailTranslation.
type ResearchProjectDetailTranslations []*ResearchProjectDetailTranslation
