package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"github.com/google/uuid"
)

// BlogTag holds the schema definition for the BlogTag entity.
type BlogTag struct {
	ent.Schema
}

// Fields of the BlogTag.
func (BlogTag) Fields() []ent.Field {
	return []ent.Field{
		field.UUID("id", uuid.UUID{}).
			Default(uuid.New),
		field.String("name").
			MaxLen(50).
			Unique(),
		field.String("slug").
			MaxLen(50).
			Unique(),
		field.Text("description").
			Optional(),
		field.String("color").
			Optional().
			MaxLen(7), // hex color code
		field.Int("post_count").
			Default(0),
		field.Time("created_at").
			Default(time.Now),
		field.Time("updated_at").
			Default(time.Now).
			UpdateDefault(time.Now),
	}
}

// Edges of the BlogTag.
func (BlogTag) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("blog_posts", BlogPost.Type).
			Ref("tags"),
	}
}
