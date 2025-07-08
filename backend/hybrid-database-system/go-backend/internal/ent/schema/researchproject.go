package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"github.com/google/uuid"
)

// ResearchProject holds the schema definition for the ResearchProject entity.
type ResearchProject struct {
	ent.Schema
}

// Fields of the ResearchProject.
func (ResearchProject) Fields() []ent.Field {
	return []ent.Field{
		field.UUID("id", uuid.UUID{}).
			Default(uuid.New),
		field.UUID("user_id", uuid.UUID{}),
		field.String("title").
			MaxLen(300),
		field.Time("start_date").
			Optional(),
		field.Time("end_date").
			Optional(),
		field.Bool("is_ongoing").
			Default(false),
		field.String("location").
			Optional().
			MaxLen(200),
		field.String("research_type").
			Optional().
			MaxLen(50),
		field.String("funding_source").
			Optional().
			MaxLen(200),
		field.Float("funding_amount").
			Optional(),
		field.Int("sort_order").
			Default(0),
		field.Time("created_at").
			Default(time.Now),
		field.Time("updated_at").
			Default(time.Now).
			UpdateDefault(time.Now),
	}
}

// Edges of the ResearchProject.
func (ResearchProject) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("user", User.Type).
			Ref("research_projects").
			Unique(),
	}
}
