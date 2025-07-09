package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"github.com/google/uuid"
)

// ProjectImage holds the schema definition for the ProjectImage entity.
type ProjectImage struct {
	ent.Schema
}

// Fields of the ProjectImage.
func (ProjectImage) Fields() []ent.Field {
	return []ent.Field{
		field.UUID("id", uuid.UUID{}).
			Default(uuid.New),
		field.String("image_url").
			MaxLen(500),
		field.String("title").
			MaxLen(200).
			Optional(),
		field.Text("description").
			Optional(),
		field.String("alt_text").
			MaxLen(200).
			Optional(),
		field.Enum("image_type").
			Values("screenshot", "diagram", "logo", "thumbnail", "demo", "other").
			Default("screenshot"),
		field.String("file_name").
			MaxLen(255).
			Optional(),
		field.Int("file_size").
			Optional(),
		field.String("mime_type").
			MaxLen(100).
			Optional(),
		field.Int("width").
			Optional(),
		field.Int("height").
			Optional(),
		field.Bool("is_primary").
			Default(false),
		field.Bool("is_public").
			Default(true),
		field.Int("sort_order").
			Default(0),
		field.Time("created_at").
			Default(time.Now),
		field.Time("updated_at").
			Default(time.Now).
			UpdateDefault(time.Now),
	}
}

// Edges of the ProjectImage.
func (ProjectImage) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("project", Project.Type).
			Ref("images").
			Unique(),
	}
}
