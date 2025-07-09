package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"github.com/google/uuid"
)

// ResearchProjectDetailTranslation holds the schema definition for the ResearchProjectDetailTranslation entity.
type ResearchProjectDetailTranslation struct {
	ent.Schema
}

// Fields of the ResearchProjectDetailTranslation.
func (ResearchProjectDetailTranslation) Fields() []ent.Field {
	return []ent.Field{
		field.UUID("id", uuid.UUID{}).
			Default(uuid.New).
			StorageKey("id"),
		field.UUID("research_project_detail_id", uuid.UUID{}).
			StorageKey("research_project_detail_id"),
		field.String("language_code").
			MaxLen(5).
			StorageKey("language_code"),
		field.Text("detail_text").
			NotEmpty(),
		field.Time("created_at").
			Default(time.Now).
			Immutable(),
		field.Time("updated_at").
			Default(time.Now).
			UpdateDefault(time.Now),
	}
}

// Edges of the ResearchProjectDetailTranslation.
func (ResearchProjectDetailTranslation) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("research_project_detail", ResearchProjectDetail.Type).
			Ref("translations").
			Field("research_project_detail_id").
			Required().
			Unique(),
		edge.From("language", Language.Type).
			Ref("research_project_detail_translations").
			Field("language_code").
			Required().
			Unique(),
	}
}
