// Code generated by ent, DO NOT EDIT.

package ideatranslation

import (
	"time"

	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
	"github.com/google/uuid"
)

const (
	// Label holds the string label denoting the ideatranslation type in the database.
	Label = "idea_translation"
	// FieldID holds the string denoting the id field in the database.
	FieldID = "id"
	// FieldIdeaID holds the string denoting the idea_id field in the database.
	FieldIdeaID = "idea_id"
	// FieldLanguageCode holds the string denoting the language_code field in the database.
	FieldLanguageCode = "language_code"
	// FieldTitle holds the string denoting the title field in the database.
	FieldTitle = "title"
	// FieldAbstract holds the string denoting the abstract field in the database.
	FieldAbstract = "abstract"
	// FieldMotivation holds the string denoting the motivation field in the database.
	FieldMotivation = "motivation"
	// FieldMethodology holds the string denoting the methodology field in the database.
	FieldMethodology = "methodology"
	// FieldExpectedOutcome holds the string denoting the expected_outcome field in the database.
	FieldExpectedOutcome = "expected_outcome"
	// FieldRequiredResources holds the string denoting the required_resources field in the database.
	FieldRequiredResources = "required_resources"
	// FieldCreatedAt holds the string denoting the created_at field in the database.
	FieldCreatedAt = "created_at"
	// EdgeIdea holds the string denoting the idea edge name in mutations.
	EdgeIdea = "idea"
	// EdgeLanguage holds the string denoting the language edge name in mutations.
	EdgeLanguage = "language"
	// LanguageFieldID holds the string denoting the ID field of the Language.
	LanguageFieldID = "code"
	// Table holds the table name of the ideatranslation in the database.
	Table = "idea_translations"
	// IdeaTable is the table that holds the idea relation/edge.
	IdeaTable = "idea_translations"
	// IdeaInverseTable is the table name for the Idea entity.
	// It exists in this package in order to avoid circular dependency with the "idea" package.
	IdeaInverseTable = "ideas"
	// IdeaColumn is the table column denoting the idea relation/edge.
	IdeaColumn = "idea_id"
	// LanguageTable is the table that holds the language relation/edge.
	LanguageTable = "idea_translations"
	// LanguageInverseTable is the table name for the Language entity.
	// It exists in this package in order to avoid circular dependency with the "language" package.
	LanguageInverseTable = "languages"
	// LanguageColumn is the table column denoting the language relation/edge.
	LanguageColumn = "language_code"
)

// Columns holds all SQL columns for ideatranslation fields.
var Columns = []string{
	FieldID,
	FieldIdeaID,
	FieldLanguageCode,
	FieldTitle,
	FieldAbstract,
	FieldMotivation,
	FieldMethodology,
	FieldExpectedOutcome,
	FieldRequiredResources,
	FieldCreatedAt,
}

// ValidColumn reports if the column name is valid (part of the table columns).
func ValidColumn(column string) bool {
	for i := range Columns {
		if column == Columns[i] {
			return true
		}
	}
	return false
}

var (
	// LanguageCodeValidator is a validator for the "language_code" field. It is called by the builders before save.
	LanguageCodeValidator func(string) error
	// TitleValidator is a validator for the "title" field. It is called by the builders before save.
	TitleValidator func(string) error
	// DefaultCreatedAt holds the default value on creation for the "created_at" field.
	DefaultCreatedAt func() time.Time
	// DefaultID holds the default value on creation for the "id" field.
	DefaultID func() uuid.UUID
)

// OrderOption defines the ordering options for the IdeaTranslation queries.
type OrderOption func(*sql.Selector)

// ByID orders the results by the id field.
func ByID(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldID, opts...).ToFunc()
}

// ByIdeaID orders the results by the idea_id field.
func ByIdeaID(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldIdeaID, opts...).ToFunc()
}

// ByLanguageCode orders the results by the language_code field.
func ByLanguageCode(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldLanguageCode, opts...).ToFunc()
}

// ByTitle orders the results by the title field.
func ByTitle(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldTitle, opts...).ToFunc()
}

// ByAbstract orders the results by the abstract field.
func ByAbstract(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldAbstract, opts...).ToFunc()
}

// ByMotivation orders the results by the motivation field.
func ByMotivation(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldMotivation, opts...).ToFunc()
}

// ByMethodology orders the results by the methodology field.
func ByMethodology(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldMethodology, opts...).ToFunc()
}

// ByExpectedOutcome orders the results by the expected_outcome field.
func ByExpectedOutcome(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldExpectedOutcome, opts...).ToFunc()
}

// ByRequiredResources orders the results by the required_resources field.
func ByRequiredResources(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldRequiredResources, opts...).ToFunc()
}

// ByCreatedAt orders the results by the created_at field.
func ByCreatedAt(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldCreatedAt, opts...).ToFunc()
}

// ByIdeaField orders the results by idea field.
func ByIdeaField(field string, opts ...sql.OrderTermOption) OrderOption {
	return func(s *sql.Selector) {
		sqlgraph.OrderByNeighborTerms(s, newIdeaStep(), sql.OrderByField(field, opts...))
	}
}

// ByLanguageField orders the results by language field.
func ByLanguageField(field string, opts ...sql.OrderTermOption) OrderOption {
	return func(s *sql.Selector) {
		sqlgraph.OrderByNeighborTerms(s, newLanguageStep(), sql.OrderByField(field, opts...))
	}
}
func newIdeaStep() *sqlgraph.Step {
	return sqlgraph.NewStep(
		sqlgraph.From(Table, FieldID),
		sqlgraph.To(IdeaInverseTable, FieldID),
		sqlgraph.Edge(sqlgraph.M2O, true, IdeaTable, IdeaColumn),
	)
}
func newLanguageStep() *sqlgraph.Step {
	return sqlgraph.NewStep(
		sqlgraph.From(Table, FieldID),
		sqlgraph.To(LanguageInverseTable, LanguageFieldID),
		sqlgraph.Edge(sqlgraph.M2O, true, LanguageTable, LanguageColumn),
	)
}
