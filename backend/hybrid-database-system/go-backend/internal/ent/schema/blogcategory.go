package schema

import (
	"time"
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"github.com/google/uuid"
)

// BlogCategory holds the schema definition for the BlogCategory entity.
type BlogCategory struct {
	ent.Schema
}

// Fields of the BlogCategory.
func (BlogCategory) Fields() []ent.Field {
	return []ent.Field{
		field.UUID("id", uuid.UUID{}).
			Default(uuid.New),
		field.String("name").
			MaxLen(100).
			Unique(),
		field.String("slug").
			MaxLen(100).
			Unique(),
		field.Text("description").
			Optional(),
		field.String("color").
			Optional().
			MaxLen(7), // hex color code
		field.String("icon").
			Optional().
			MaxLen(100),
		field.Int("post_count").
			Default(0),
		field.Time("created_at").
			Default(time.Now),
		field.Time("updated_at").
			Default(time.Now).
			UpdateDefault(time.Now),
	}
}

// Edges of the BlogCategory.
func (BlogCategory) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("blog_posts", BlogPost.Type),
	}
}
