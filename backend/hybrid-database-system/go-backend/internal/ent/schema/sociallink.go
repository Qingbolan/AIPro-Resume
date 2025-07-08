package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"github.com/google/uuid"
)

// SocialLink holds the schema definition for the SocialLink entity.
type SocialLink struct {
	ent.Schema
}

// Fields of the SocialLink.
func (SocialLink) Fields() []ent.Field {
	return []ent.Field{
		field.UUID("id", uuid.UUID{}).
			Default(uuid.New).
			StorageKey("id"),
		field.UUID("user_id", uuid.UUID{}),
		field.String("platform").
			MaxLen(50),
		field.String("url").
			MaxLen(500),
		field.String("username").
			Optional().
			MaxLen(100),
		field.String("display_name").
			Optional().
			MaxLen(100),
		field.Bool("is_public").
			Default(true),
		field.Int("order").
			Default(0),
		field.Time("created_at").
			Default(time.Now),
		field.Time("updated_at").
			Default(time.Now).
			UpdateDefault(time.Now),
	}
}

// Edges of the SocialLink.
func (SocialLink) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("user", User.Type).
			Ref("social_links").
			Required().
			Unique(),
	}
}
