package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"github.com/google/uuid"
)

// ProjectDetailTranslation holds the schema definition for the ProjectDetailTranslation entity.
type ProjectDetailTranslation struct {
	ent.Schema
}

// Fields of the ProjectDetailTranslation.
func (ProjectDetailTranslation) Fields() []ent.Field {
	return []ent.Field{
		field.UUID("id", uuid.UUID{}).
			Default(uuid.New).
			StorageKey("id"),
		field.UUID("project_detail_id", uuid.UUID{}).
			StorageKey("project_detail_id"),
		field.String("language_code").
			MaxLen(5).
			StorageKey("language_code"),
		field.Text("detailed_description").
			Optional(),
		field.Text("goals").
			Optional(),
		field.Text("challenges").
			Optional(),
		field.Text("solutions").
			Optional(),
		field.Text("lessons_learned").
			Optional(),
		field.Text("future_enhancements").
			Optional(),
		field.Time("created_at").
			Default(time.Now).
			Immutable(),
		field.Time("updated_at").
			Default(time.Now).
			UpdateDefault(time.Now),
	}
}

// Edges of the ProjectDetailTranslation.
func (ProjectDetailTranslation) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("project_detail", ProjectDetail.Type).
			Ref("translations").
			Field("project_detail_id").
			Required().
			Unique(),
		edge.From("language", Language.Type).
			Ref("project_detail_translations").
			Field("language_code").
			Required().
			Unique(),
	}
}
