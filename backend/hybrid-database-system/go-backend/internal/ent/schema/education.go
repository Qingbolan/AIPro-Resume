package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"github.com/google/uuid"
)

// Education holds the schema definition for the Education entity.
type Education struct {
	ent.Schema
}

// Fields of the Education.
func (Education) Fields() []ent.Field {
	return []ent.Field{
		field.UUID("id", uuid.UUID{}).
			Default(uuid.New),
		field.String("institution").
			MaxLen(200),
		field.String("degree").
			MaxLen(200),
		field.String("field_of_study").
			Optional().
			MaxLen(200),
		field.Time("start_date").
			Optional(),
		field.Time("end_date").
			Optional(),
		field.Bool("is_current").
			Default(false),
		field.String("gpa").
			Optional().
			MaxLen(10),
		field.String("location").
			Optional().
			MaxLen(200),
		field.String("institution_website").
			Optional().
			MaxLen(500),
		field.String("institution_logo_url").
			Optional().
			MaxLen(500),
		field.Int("sort_order").
			Default(0),
		field.Time("created_at").
			Default(time.Now),
		field.Time("updated_at").
			Default(time.Now).
			UpdateDefault(time.Now),
	}
}

// Edges of the Education.
func (Education) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("user", User.Type).
			Ref("education").
			Unique(),
	}
}
