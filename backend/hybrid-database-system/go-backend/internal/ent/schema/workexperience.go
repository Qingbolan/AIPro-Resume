package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"github.com/google/uuid"
)

// WorkExperience holds the schema definition for the WorkExperience entity.
type WorkExperience struct {
	ent.Schema
}

// Fields of the WorkExperience.
func (WorkExperience) Fields() []ent.Field {
	return []ent.Field{
		field.UUID("id", uuid.UUID{}).
			Default(uuid.New),
		field.String("company").
			MaxLen(200),
		field.String("position").
			MaxLen(200),
		field.Time("start_date").
			Optional(),
		field.Time("end_date").
			Optional(),
		field.Bool("is_current").
			Default(false),
		field.String("location").
			Optional().
			MaxLen(200),
		field.String("company_website").
			Optional().
			MaxLen(500),
		field.String("company_logo_url").
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

// Edges of the WorkExperience.
func (WorkExperience) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("user", User.Type).
			Ref("work_experience").
			Unique(),
	}
}
