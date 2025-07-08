package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"github.com/google/uuid"
)

// BlogComment holds the schema definition for the BlogComment entity.
type BlogComment struct {
	ent.Schema
}

// Fields of the BlogComment.
func (BlogComment) Fields() []ent.Field {
	return []ent.Field{
		field.UUID("id", uuid.UUID{}).
			Default(uuid.New),
		field.UUID("blog_post_id", uuid.UUID{}),
		field.UUID("parent_id", uuid.UUID{}).
			Optional(), // For nested comments
		field.String("author_name").
			MaxLen(100), // For anonymous comments
		field.String("author_email").
			MaxLen(255), // For anonymous comments
		field.String("author_website").
			Optional().
			MaxLen(255),
		field.Text("content"),
		field.Bool("is_approved").
			Default(false),
		field.Bool("is_spam").
			Default(false),
		field.String("ip_address").
			Optional().
			MaxLen(45), // IPv6 max length
		field.String("user_agent").
			Optional().
			MaxLen(500),
		field.Int("like_count").
			Default(0),
		field.Int("dislike_count").
			Default(0),
		field.Time("created_at").
			Default(time.Now),
		field.Time("updated_at").
			Default(time.Now).
			UpdateDefault(time.Now),
	}
}

// Edges of the BlogComment.
func (BlogComment) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("post", BlogPost.Type).
			Ref("comments").
			Unique(),
		edge.To("replies", BlogComment.Type).
			From("parent").
			Unique().
			Field("parent_id"),
	}
}
