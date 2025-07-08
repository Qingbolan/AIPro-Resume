package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"github.com/google/uuid"
)

// BlogSeries holds the schema definition for the BlogSeries entity.
type BlogSeries struct {
	ent.Schema
}

// Fields of the BlogSeries.
func (BlogSeries) Fields() []ent.Field {
	return []ent.Field{
		field.UUID("id", uuid.UUID{}).
			Default(uuid.New),
		field.UUID("user_id", uuid.UUID{}),
		field.String("title").
			MaxLen(200),
		field.String("slug").
			MaxLen(200).
			Unique(),
		field.Text("description").
			Optional(),
		field.String("featured_image_url").
			Optional().
			MaxLen(500),
		field.Int("post_count").
			Default(0),
		field.Bool("is_completed").
			Default(false),
		field.Time("created_at").
			Default(time.Now),
		field.Time("updated_at").
			Default(time.Now).
			UpdateDefault(time.Now),
	}
}

// Edges of the BlogSeries.
func (BlogSeries) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("user", User.Type).
			Ref("blog_series").
			Unique(),
		edge.To("blog_posts", BlogPost.Type),
	}
}
