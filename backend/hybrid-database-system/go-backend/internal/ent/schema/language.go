package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/field"
)

// Language holds the schema definition for the Language entity.
type Language struct {
	ent.Schema
}

// Fields of the Language.
func (Language) Fields() []ent.Field {
	return []ent.Field{
		field.String("code").
			MaxLen(5).
			StorageKey("code").
			Unique(),
		field.String("name").
			MaxLen(50),
		field.String("native_name").
			MaxLen(50),
		field.Bool("is_active").
			Default(true),
		field.Time("created_at").
			Default(time.Now),
	}
}

// Edges of the Language.
func (Language) Edges() []ent.Edge {
	return nil
}
