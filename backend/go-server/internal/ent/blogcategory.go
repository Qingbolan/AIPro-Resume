// Code generated by ent, DO NOT EDIT.

package ent

import (
	"fmt"
	"silan-backend/internal/ent/blogcategory"
	"strings"
	"time"

	"entgo.io/ent"
	"entgo.io/ent/dialect/sql"
	"github.com/google/uuid"
)

// BlogCategory is the model entity for the BlogCategory schema.
type BlogCategory struct {
	config `json:"-"`
	// ID of the ent.
	ID uuid.UUID `json:"id,omitempty"`
	// Name holds the value of the "name" field.
	Name string `json:"name,omitempty"`
	// Slug holds the value of the "slug" field.
	Slug string `json:"slug,omitempty"`
	// Description holds the value of the "description" field.
	Description string `json:"description,omitempty"`
	// Color holds the value of the "color" field.
	Color string `json:"color,omitempty"`
	// SortOrder holds the value of the "sort_order" field.
	SortOrder int `json:"sort_order,omitempty"`
	// CreatedAt holds the value of the "created_at" field.
	CreatedAt time.Time `json:"created_at,omitempty"`
	// UpdatedAt holds the value of the "updated_at" field.
	UpdatedAt time.Time `json:"updated_at,omitempty"`
	// Edges holds the relations/edges for other nodes in the graph.
	// The values are being populated by the BlogCategoryQuery when eager-loading is set.
	Edges        BlogCategoryEdges `json:"edges"`
	selectValues sql.SelectValues
}

// BlogCategoryEdges holds the relations/edges for other nodes in the graph.
type BlogCategoryEdges struct {
	// Translations holds the value of the translations edge.
	Translations []*BlogCategoryTranslation `json:"translations,omitempty"`
	// BlogPosts holds the value of the blog_posts edge.
	BlogPosts []*BlogPost `json:"blog_posts,omitempty"`
	// loadedTypes holds the information for reporting if a
	// type was loaded (or requested) in eager-loading or not.
	loadedTypes [2]bool
}

// TranslationsOrErr returns the Translations value or an error if the edge
// was not loaded in eager-loading.
func (e BlogCategoryEdges) TranslationsOrErr() ([]*BlogCategoryTranslation, error) {
	if e.loadedTypes[0] {
		return e.Translations, nil
	}
	return nil, &NotLoadedError{edge: "translations"}
}

// BlogPostsOrErr returns the BlogPosts value or an error if the edge
// was not loaded in eager-loading.
func (e BlogCategoryEdges) BlogPostsOrErr() ([]*BlogPost, error) {
	if e.loadedTypes[1] {
		return e.BlogPosts, nil
	}
	return nil, &NotLoadedError{edge: "blog_posts"}
}

// scanValues returns the types for scanning values from sql.Rows.
func (*BlogCategory) scanValues(columns []string) ([]any, error) {
	values := make([]any, len(columns))
	for i := range columns {
		switch columns[i] {
		case blogcategory.FieldSortOrder:
			values[i] = new(sql.NullInt64)
		case blogcategory.FieldName, blogcategory.FieldSlug, blogcategory.FieldDescription, blogcategory.FieldColor:
			values[i] = new(sql.NullString)
		case blogcategory.FieldCreatedAt, blogcategory.FieldUpdatedAt:
			values[i] = new(sql.NullTime)
		case blogcategory.FieldID:
			values[i] = new(uuid.UUID)
		default:
			values[i] = new(sql.UnknownType)
		}
	}
	return values, nil
}

// assignValues assigns the values that were returned from sql.Rows (after scanning)
// to the BlogCategory fields.
func (bc *BlogCategory) assignValues(columns []string, values []any) error {
	if m, n := len(values), len(columns); m < n {
		return fmt.Errorf("mismatch number of scan values: %d != %d", m, n)
	}
	for i := range columns {
		switch columns[i] {
		case blogcategory.FieldID:
			if value, ok := values[i].(*uuid.UUID); !ok {
				return fmt.Errorf("unexpected type %T for field id", values[i])
			} else if value != nil {
				bc.ID = *value
			}
		case blogcategory.FieldName:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field name", values[i])
			} else if value.Valid {
				bc.Name = value.String
			}
		case blogcategory.FieldSlug:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field slug", values[i])
			} else if value.Valid {
				bc.Slug = value.String
			}
		case blogcategory.FieldDescription:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field description", values[i])
			} else if value.Valid {
				bc.Description = value.String
			}
		case blogcategory.FieldColor:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field color", values[i])
			} else if value.Valid {
				bc.Color = value.String
			}
		case blogcategory.FieldSortOrder:
			if value, ok := values[i].(*sql.NullInt64); !ok {
				return fmt.Errorf("unexpected type %T for field sort_order", values[i])
			} else if value.Valid {
				bc.SortOrder = int(value.Int64)
			}
		case blogcategory.FieldCreatedAt:
			if value, ok := values[i].(*sql.NullTime); !ok {
				return fmt.Errorf("unexpected type %T for field created_at", values[i])
			} else if value.Valid {
				bc.CreatedAt = value.Time
			}
		case blogcategory.FieldUpdatedAt:
			if value, ok := values[i].(*sql.NullTime); !ok {
				return fmt.Errorf("unexpected type %T for field updated_at", values[i])
			} else if value.Valid {
				bc.UpdatedAt = value.Time
			}
		default:
			bc.selectValues.Set(columns[i], values[i])
		}
	}
	return nil
}

// Value returns the ent.Value that was dynamically selected and assigned to the BlogCategory.
// This includes values selected through modifiers, order, etc.
func (bc *BlogCategory) Value(name string) (ent.Value, error) {
	return bc.selectValues.Get(name)
}

// QueryTranslations queries the "translations" edge of the BlogCategory entity.
func (bc *BlogCategory) QueryTranslations() *BlogCategoryTranslationQuery {
	return NewBlogCategoryClient(bc.config).QueryTranslations(bc)
}

// QueryBlogPosts queries the "blog_posts" edge of the BlogCategory entity.
func (bc *BlogCategory) QueryBlogPosts() *BlogPostQuery {
	return NewBlogCategoryClient(bc.config).QueryBlogPosts(bc)
}

// Update returns a builder for updating this BlogCategory.
// Note that you need to call BlogCategory.Unwrap() before calling this method if this BlogCategory
// was returned from a transaction, and the transaction was committed or rolled back.
func (bc *BlogCategory) Update() *BlogCategoryUpdateOne {
	return NewBlogCategoryClient(bc.config).UpdateOne(bc)
}

// Unwrap unwraps the BlogCategory entity that was returned from a transaction after it was closed,
// so that all future queries will be executed through the driver which created the transaction.
func (bc *BlogCategory) Unwrap() *BlogCategory {
	_tx, ok := bc.config.driver.(*txDriver)
	if !ok {
		panic("ent: BlogCategory is not a transactional entity")
	}
	bc.config.driver = _tx.drv
	return bc
}

// String implements the fmt.Stringer.
func (bc *BlogCategory) String() string {
	var builder strings.Builder
	builder.WriteString("BlogCategory(")
	builder.WriteString(fmt.Sprintf("id=%v, ", bc.ID))
	builder.WriteString("name=")
	builder.WriteString(bc.Name)
	builder.WriteString(", ")
	builder.WriteString("slug=")
	builder.WriteString(bc.Slug)
	builder.WriteString(", ")
	builder.WriteString("description=")
	builder.WriteString(bc.Description)
	builder.WriteString(", ")
	builder.WriteString("color=")
	builder.WriteString(bc.Color)
	builder.WriteString(", ")
	builder.WriteString("sort_order=")
	builder.WriteString(fmt.Sprintf("%v", bc.SortOrder))
	builder.WriteString(", ")
	builder.WriteString("created_at=")
	builder.WriteString(bc.CreatedAt.Format(time.ANSIC))
	builder.WriteString(", ")
	builder.WriteString("updated_at=")
	builder.WriteString(bc.UpdatedAt.Format(time.ANSIC))
	builder.WriteByte(')')
	return builder.String()
}

// BlogCategories is a parsable slice of BlogCategory.
type BlogCategories []*BlogCategory
