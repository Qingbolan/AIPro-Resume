package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"github.com/google/uuid"
)

// BlogCategoryTranslation holds the schema definition for the BlogCategoryTranslation entity.
type BlogCategoryTranslation struct {
	ent.Schema
}

// Fields of the BlogCategoryTranslation.
func (BlogCategoryTranslation) Fields() []ent.Field {
	return []ent.Field{
		field.UUID("id", uuid.UUID{}).
			Default(uuid.New).
			StorageKey("id"),
		field.UUID("blog_category_id", uuid.UUID{}).
			StorageKey("blog_category_id"),
		field.String("language_code").
			MaxLen(5).
			StorageKey("language_code"),
		field.String("name").
			MaxLen(100).
			NotEmpty(),
		field.Text("description").
			Optional(),
		field.Time("created_at").
			Default(time.Now).
			Immutable(),
		field.Time("updated_at").
			Default(time.Now).
			UpdateDefault(time.Now),
	}
}

// Edges of the BlogCategoryTranslation.
func (BlogCategoryTranslation) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("blog_category", BlogCategory.Type).
			Ref("translations").
			Field("blog_category_id").
			Required().
			Unique(),
		edge.From("language", Language.Type).
			Ref("blog_category_translations").
			Field("language_code").
			Required().
			Unique(),
	}
}
