package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"github.com/google/uuid"
)

// ProjectTechnology holds the schema definition for the ProjectTechnology entity.
type ProjectTechnology struct {
	ent.Schema
}

// Fields of the ProjectTechnology.
func (ProjectTechnology) Fields() []ent.Field {
	return []ent.Field{
		field.UUID("id", uuid.UUID{}).
			Default(uuid.New),
		field.String("technology_name").
			MaxLen(100),
		field.String("category").
			MaxLen(50).
			Optional(),
		field.String("version").
			MaxLen(50).
			Optional(),
		field.String("proficiency_level").
			MaxLen(20).
			Optional(),
		field.Text("description").
			Optional(),
		field.String("icon_url").
			MaxLen(500).
			Optional(),
		field.String("documentation_url").
			MaxLen(500).
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

// Edges of the ProjectTechnology.
func (ProjectTechnology) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("project", Project.Type).
			Ref("technologies").
			Unique(),
	}
}
