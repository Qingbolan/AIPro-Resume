package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"github.com/google/uuid"
)

// WorkExperienceDetailTranslation holds the schema definition for the WorkExperienceDetailTranslation entity.
type WorkExperienceDetailTranslation struct {
	ent.Schema
}

// Fields of the WorkExperienceDetailTranslation.
func (WorkExperienceDetailTranslation) Fields() []ent.Field {
	return []ent.Field{
		field.UUID("id", uuid.UUID{}).
			Default(uuid.New).
			StorageKey("id"),
		field.UUID("work_experience_detail_id", uuid.UUID{}).
			StorageKey("work_experience_detail_id"),
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

// Edges of the WorkExperienceDetailTranslation.
func (WorkExperienceDetailTranslation) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("work_experience_detail", WorkExperienceDetail.Type).
			Ref("translations").
			Field("work_experience_detail_id").
			Required().
			Unique(),
		edge.From("language", Language.Type).
			Ref("work_experience_detail_translations").
			Field("language_code").
			Required().
			Unique(),
	}
}
