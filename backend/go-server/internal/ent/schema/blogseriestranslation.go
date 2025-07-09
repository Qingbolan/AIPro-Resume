package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"github.com/google/uuid"
)

// BlogSeriesTranslation holds the schema definition for the BlogSeriesTranslation entity.
type BlogSeriesTranslation struct {
	ent.Schema
}

// Fields of the BlogSeriesTranslation.
func (BlogSeriesTranslation) Fields() []ent.Field {
	return []ent.Field{
		field.UUID("id", uuid.UUID{}).
			Default(uuid.New).
			StorageKey("id"),
		field.UUID("blog_series_id", uuid.UUID{}).
			StorageKey("blog_series_id"),
		field.String("language_code").
			MaxLen(5).
			StorageKey("language_code"),
		field.String("title").
			MaxLen(300).
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

// Edges of the BlogSeriesTranslation.
func (BlogSeriesTranslation) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("blog_series", BlogSeries.Type).
			Ref("translations").
			Field("blog_series_id").
			Required().
			Unique(),
		edge.From("language", Language.Type).
			Ref("blog_series_translations").
			Field("language_code").
			Required().
			Unique(),
	}
}
