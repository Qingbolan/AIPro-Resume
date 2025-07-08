package schema

import (
	"time"
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"github.com/google/uuid"
)

// Award holds the schema definition for the Award entity.
type Award struct {
	ent.Schema
}

// Fields of the Award.
func (Award) Fields() []ent.Field {
	return []ent.Field{
		field.UUID("id", uuid.UUID{}).
			Default(uuid.New),
		field.UUID("user_id", uuid.UUID{}),
		field.String("title").
			MaxLen(300),
		field.String("awarding_organization").
			MaxLen(200),
		field.Time("award_date").
			Optional(),
		field.String("award_type").
			Optional().
			MaxLen(50),
		field.Float("amount").
			Optional(),
		field.Text("description").
			Optional(),
		field.String("certificate_url").
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

// Edges of the Award.
func (Award) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("user", User.Type).
			Ref("awards").
			Unique(),
	}
}
