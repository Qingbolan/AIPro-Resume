package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"github.com/google/uuid"
)

// PersonalInfo holds the schema definition for the PersonalInfo entity.
type PersonalInfo struct {
	ent.Schema
}

// Fields of the PersonalInfo.
func (PersonalInfo) Fields() []ent.Field {
	return []ent.Field{
		field.UUID("id", uuid.UUID{}).
			Default(uuid.New).
			StorageKey("id"),
		field.UUID("user_id", uuid.UUID{}),
		field.String("phone").
			Optional().
			MaxLen(20),
		field.String("website").
			Optional().
			MaxLen(500),
		field.String("location").
			Optional().
			MaxLen(255),
		field.String("address").
			Optional().
			MaxLen(500),
		field.String("linkedin").
			Optional().
			MaxLen(255),
		field.String("github").
			Optional().
			MaxLen(255),
		field.String("twitter").
			Optional().
			MaxLen(255),
		field.String("personal_email").
			Optional().
			MaxLen(255),
		field.Text("summary").
			Optional(),
		field.Time("created_at").
			Default(time.Now),
		field.Time("updated_at").
			Default(time.Now).
			UpdateDefault(time.Now),
	}
}

// Edges of the PersonalInfo.
func (PersonalInfo) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("user", User.Type).
			Ref("personal_info").
			Required().
			Unique(),
	}
}
