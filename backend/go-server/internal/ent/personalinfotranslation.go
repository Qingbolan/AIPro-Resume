// Code generated by ent, DO NOT EDIT.

package ent

import (
	"fmt"
	"silan-backend/internal/ent/language"
	"silan-backend/internal/ent/personalinfo"
	"silan-backend/internal/ent/personalinfotranslation"
	"strings"
	"time"

	"entgo.io/ent"
	"entgo.io/ent/dialect/sql"
	"github.com/google/uuid"
)

// PersonalInfoTranslation is the model entity for the PersonalInfoTranslation schema.
type PersonalInfoTranslation struct {
	config `json:"-"`
	// ID of the ent.
	ID uuid.UUID `json:"id,omitempty"`
	// PersonalInfoID holds the value of the "personal_info_id" field.
	PersonalInfoID uuid.UUID `json:"personal_info_id,omitempty"`
	// LanguageCode holds the value of the "language_code" field.
	LanguageCode string `json:"language_code,omitempty"`
	// FullName holds the value of the "full_name" field.
	FullName string `json:"full_name,omitempty"`
	// Title holds the value of the "title" field.
	Title string `json:"title,omitempty"`
	// CurrentStatus holds the value of the "current_status" field.
	CurrentStatus string `json:"current_status,omitempty"`
	// Location holds the value of the "location" field.
	Location string `json:"location,omitempty"`
	// CreatedAt holds the value of the "created_at" field.
	CreatedAt time.Time `json:"created_at,omitempty"`
	// Edges holds the relations/edges for other nodes in the graph.
	// The values are being populated by the PersonalInfoTranslationQuery when eager-loading is set.
	Edges        PersonalInfoTranslationEdges `json:"edges"`
	selectValues sql.SelectValues
}

// PersonalInfoTranslationEdges holds the relations/edges for other nodes in the graph.
type PersonalInfoTranslationEdges struct {
	// PersonalInfo holds the value of the personal_info edge.
	PersonalInfo *PersonalInfo `json:"personal_info,omitempty"`
	// Language holds the value of the language edge.
	Language *Language `json:"language,omitempty"`
	// loadedTypes holds the information for reporting if a
	// type was loaded (or requested) in eager-loading or not.
	loadedTypes [2]bool
}

// PersonalInfoOrErr returns the PersonalInfo value or an error if the edge
// was not loaded in eager-loading, or loaded but was not found.
func (e PersonalInfoTranslationEdges) PersonalInfoOrErr() (*PersonalInfo, error) {
	if e.PersonalInfo != nil {
		return e.PersonalInfo, nil
	} else if e.loadedTypes[0] {
		return nil, &NotFoundError{label: personalinfo.Label}
	}
	return nil, &NotLoadedError{edge: "personal_info"}
}

// LanguageOrErr returns the Language value or an error if the edge
// was not loaded in eager-loading, or loaded but was not found.
func (e PersonalInfoTranslationEdges) LanguageOrErr() (*Language, error) {
	if e.Language != nil {
		return e.Language, nil
	} else if e.loadedTypes[1] {
		return nil, &NotFoundError{label: language.Label}
	}
	return nil, &NotLoadedError{edge: "language"}
}

// scanValues returns the types for scanning values from sql.Rows.
func (*PersonalInfoTranslation) scanValues(columns []string) ([]any, error) {
	values := make([]any, len(columns))
	for i := range columns {
		switch columns[i] {
		case personalinfotranslation.FieldLanguageCode, personalinfotranslation.FieldFullName, personalinfotranslation.FieldTitle, personalinfotranslation.FieldCurrentStatus, personalinfotranslation.FieldLocation:
			values[i] = new(sql.NullString)
		case personalinfotranslation.FieldCreatedAt:
			values[i] = new(sql.NullTime)
		case personalinfotranslation.FieldID, personalinfotranslation.FieldPersonalInfoID:
			values[i] = new(uuid.UUID)
		default:
			values[i] = new(sql.UnknownType)
		}
	}
	return values, nil
}

// assignValues assigns the values that were returned from sql.Rows (after scanning)
// to the PersonalInfoTranslation fields.
func (pit *PersonalInfoTranslation) assignValues(columns []string, values []any) error {
	if m, n := len(values), len(columns); m < n {
		return fmt.Errorf("mismatch number of scan values: %d != %d", m, n)
	}
	for i := range columns {
		switch columns[i] {
		case personalinfotranslation.FieldID:
			if value, ok := values[i].(*uuid.UUID); !ok {
				return fmt.Errorf("unexpected type %T for field id", values[i])
			} else if value != nil {
				pit.ID = *value
			}
		case personalinfotranslation.FieldPersonalInfoID:
			if value, ok := values[i].(*uuid.UUID); !ok {
				return fmt.Errorf("unexpected type %T for field personal_info_id", values[i])
			} else if value != nil {
				pit.PersonalInfoID = *value
			}
		case personalinfotranslation.FieldLanguageCode:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field language_code", values[i])
			} else if value.Valid {
				pit.LanguageCode = value.String
			}
		case personalinfotranslation.FieldFullName:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field full_name", values[i])
			} else if value.Valid {
				pit.FullName = value.String
			}
		case personalinfotranslation.FieldTitle:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field title", values[i])
			} else if value.Valid {
				pit.Title = value.String
			}
		case personalinfotranslation.FieldCurrentStatus:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field current_status", values[i])
			} else if value.Valid {
				pit.CurrentStatus = value.String
			}
		case personalinfotranslation.FieldLocation:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field location", values[i])
			} else if value.Valid {
				pit.Location = value.String
			}
		case personalinfotranslation.FieldCreatedAt:
			if value, ok := values[i].(*sql.NullTime); !ok {
				return fmt.Errorf("unexpected type %T for field created_at", values[i])
			} else if value.Valid {
				pit.CreatedAt = value.Time
			}
		default:
			pit.selectValues.Set(columns[i], values[i])
		}
	}
	return nil
}

// Value returns the ent.Value that was dynamically selected and assigned to the PersonalInfoTranslation.
// This includes values selected through modifiers, order, etc.
func (pit *PersonalInfoTranslation) Value(name string) (ent.Value, error) {
	return pit.selectValues.Get(name)
}

// QueryPersonalInfo queries the "personal_info" edge of the PersonalInfoTranslation entity.
func (pit *PersonalInfoTranslation) QueryPersonalInfo() *PersonalInfoQuery {
	return NewPersonalInfoTranslationClient(pit.config).QueryPersonalInfo(pit)
}

// QueryLanguage queries the "language" edge of the PersonalInfoTranslation entity.
func (pit *PersonalInfoTranslation) QueryLanguage() *LanguageQuery {
	return NewPersonalInfoTranslationClient(pit.config).QueryLanguage(pit)
}

// Update returns a builder for updating this PersonalInfoTranslation.
// Note that you need to call PersonalInfoTranslation.Unwrap() before calling this method if this PersonalInfoTranslation
// was returned from a transaction, and the transaction was committed or rolled back.
func (pit *PersonalInfoTranslation) Update() *PersonalInfoTranslationUpdateOne {
	return NewPersonalInfoTranslationClient(pit.config).UpdateOne(pit)
}

// Unwrap unwraps the PersonalInfoTranslation entity that was returned from a transaction after it was closed,
// so that all future queries will be executed through the driver which created the transaction.
func (pit *PersonalInfoTranslation) Unwrap() *PersonalInfoTranslation {
	_tx, ok := pit.config.driver.(*txDriver)
	if !ok {
		panic("ent: PersonalInfoTranslation is not a transactional entity")
	}
	pit.config.driver = _tx.drv
	return pit
}

// String implements the fmt.Stringer.
func (pit *PersonalInfoTranslation) String() string {
	var builder strings.Builder
	builder.WriteString("PersonalInfoTranslation(")
	builder.WriteString(fmt.Sprintf("id=%v, ", pit.ID))
	builder.WriteString("personal_info_id=")
	builder.WriteString(fmt.Sprintf("%v", pit.PersonalInfoID))
	builder.WriteString(", ")
	builder.WriteString("language_code=")
	builder.WriteString(pit.LanguageCode)
	builder.WriteString(", ")
	builder.WriteString("full_name=")
	builder.WriteString(pit.FullName)
	builder.WriteString(", ")
	builder.WriteString("title=")
	builder.WriteString(pit.Title)
	builder.WriteString(", ")
	builder.WriteString("current_status=")
	builder.WriteString(pit.CurrentStatus)
	builder.WriteString(", ")
	builder.WriteString("location=")
	builder.WriteString(pit.Location)
	builder.WriteString(", ")
	builder.WriteString("created_at=")
	builder.WriteString(pit.CreatedAt.Format(time.ANSIC))
	builder.WriteByte(')')
	return builder.String()
}

// PersonalInfoTranslations is a parsable slice of PersonalInfoTranslation.
type PersonalInfoTranslations []*PersonalInfoTranslation
