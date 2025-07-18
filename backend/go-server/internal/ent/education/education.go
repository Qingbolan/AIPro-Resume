// Code generated by ent, DO NOT EDIT.

package education

import (
	"time"

	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
	"github.com/google/uuid"
)

const (
	// Label holds the string label denoting the education type in the database.
	Label = "education"
	// FieldID holds the string denoting the id field in the database.
	FieldID = "id"
	// FieldUserID holds the string denoting the user_id field in the database.
	FieldUserID = "user_id"
	// FieldInstitution holds the string denoting the institution field in the database.
	FieldInstitution = "institution"
	// FieldDegree holds the string denoting the degree field in the database.
	FieldDegree = "degree"
	// FieldFieldOfStudy holds the string denoting the field_of_study field in the database.
	FieldFieldOfStudy = "field_of_study"
	// FieldStartDate holds the string denoting the start_date field in the database.
	FieldStartDate = "start_date"
	// FieldEndDate holds the string denoting the end_date field in the database.
	FieldEndDate = "end_date"
	// FieldIsCurrent holds the string denoting the is_current field in the database.
	FieldIsCurrent = "is_current"
	// FieldGpa holds the string denoting the gpa field in the database.
	FieldGpa = "gpa"
	// FieldLocation holds the string denoting the location field in the database.
	FieldLocation = "location"
	// FieldInstitutionWebsite holds the string denoting the institution_website field in the database.
	FieldInstitutionWebsite = "institution_website"
	// FieldInstitutionLogoURL holds the string denoting the institution_logo_url field in the database.
	FieldInstitutionLogoURL = "institution_logo_url"
	// FieldSortOrder holds the string denoting the sort_order field in the database.
	FieldSortOrder = "sort_order"
	// FieldCreatedAt holds the string denoting the created_at field in the database.
	FieldCreatedAt = "created_at"
	// FieldUpdatedAt holds the string denoting the updated_at field in the database.
	FieldUpdatedAt = "updated_at"
	// EdgeUser holds the string denoting the user edge name in mutations.
	EdgeUser = "user"
	// EdgeTranslations holds the string denoting the translations edge name in mutations.
	EdgeTranslations = "translations"
	// EdgeDetails holds the string denoting the details edge name in mutations.
	EdgeDetails = "details"
	// Table holds the table name of the education in the database.
	Table = "education"
	// UserTable is the table that holds the user relation/edge.
	UserTable = "education"
	// UserInverseTable is the table name for the User entity.
	// It exists in this package in order to avoid circular dependency with the "user" package.
	UserInverseTable = "users"
	// UserColumn is the table column denoting the user relation/edge.
	UserColumn = "user_id"
	// TranslationsTable is the table that holds the translations relation/edge.
	TranslationsTable = "education_translations"
	// TranslationsInverseTable is the table name for the EducationTranslation entity.
	// It exists in this package in order to avoid circular dependency with the "educationtranslation" package.
	TranslationsInverseTable = "education_translations"
	// TranslationsColumn is the table column denoting the translations relation/edge.
	TranslationsColumn = "education_id"
	// DetailsTable is the table that holds the details relation/edge.
	DetailsTable = "education_details"
	// DetailsInverseTable is the table name for the EducationDetail entity.
	// It exists in this package in order to avoid circular dependency with the "educationdetail" package.
	DetailsInverseTable = "education_details"
	// DetailsColumn is the table column denoting the details relation/edge.
	DetailsColumn = "education_id"
)

// Columns holds all SQL columns for education fields.
var Columns = []string{
	FieldID,
	FieldUserID,
	FieldInstitution,
	FieldDegree,
	FieldFieldOfStudy,
	FieldStartDate,
	FieldEndDate,
	FieldIsCurrent,
	FieldGpa,
	FieldLocation,
	FieldInstitutionWebsite,
	FieldInstitutionLogoURL,
	FieldSortOrder,
	FieldCreatedAt,
	FieldUpdatedAt,
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
	// InstitutionValidator is a validator for the "institution" field. It is called by the builders before save.
	InstitutionValidator func(string) error
	// DegreeValidator is a validator for the "degree" field. It is called by the builders before save.
	DegreeValidator func(string) error
	// FieldOfStudyValidator is a validator for the "field_of_study" field. It is called by the builders before save.
	FieldOfStudyValidator func(string) error
	// DefaultIsCurrent holds the default value on creation for the "is_current" field.
	DefaultIsCurrent bool
	// GpaValidator is a validator for the "gpa" field. It is called by the builders before save.
	GpaValidator func(string) error
	// LocationValidator is a validator for the "location" field. It is called by the builders before save.
	LocationValidator func(string) error
	// InstitutionWebsiteValidator is a validator for the "institution_website" field. It is called by the builders before save.
	InstitutionWebsiteValidator func(string) error
	// InstitutionLogoURLValidator is a validator for the "institution_logo_url" field. It is called by the builders before save.
	InstitutionLogoURLValidator func(string) error
	// DefaultSortOrder holds the default value on creation for the "sort_order" field.
	DefaultSortOrder int
	// DefaultCreatedAt holds the default value on creation for the "created_at" field.
	DefaultCreatedAt func() time.Time
	// DefaultUpdatedAt holds the default value on creation for the "updated_at" field.
	DefaultUpdatedAt func() time.Time
	// UpdateDefaultUpdatedAt holds the default value on update for the "updated_at" field.
	UpdateDefaultUpdatedAt func() time.Time
	// DefaultID holds the default value on creation for the "id" field.
	DefaultID func() uuid.UUID
)

// OrderOption defines the ordering options for the Education queries.
type OrderOption func(*sql.Selector)

// ByID orders the results by the id field.
func ByID(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldID, opts...).ToFunc()
}

// ByUserID orders the results by the user_id field.
func ByUserID(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldUserID, opts...).ToFunc()
}

// ByInstitution orders the results by the institution field.
func ByInstitution(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldInstitution, opts...).ToFunc()
}

// ByDegree orders the results by the degree field.
func ByDegree(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldDegree, opts...).ToFunc()
}

// ByFieldOfStudy orders the results by the field_of_study field.
func ByFieldOfStudy(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldFieldOfStudy, opts...).ToFunc()
}

// ByStartDate orders the results by the start_date field.
func ByStartDate(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldStartDate, opts...).ToFunc()
}

// ByEndDate orders the results by the end_date field.
func ByEndDate(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldEndDate, opts...).ToFunc()
}

// ByIsCurrent orders the results by the is_current field.
func ByIsCurrent(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldIsCurrent, opts...).ToFunc()
}

// ByGpa orders the results by the gpa field.
func ByGpa(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldGpa, opts...).ToFunc()
}

// ByLocation orders the results by the location field.
func ByLocation(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldLocation, opts...).ToFunc()
}

// ByInstitutionWebsite orders the results by the institution_website field.
func ByInstitutionWebsite(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldInstitutionWebsite, opts...).ToFunc()
}

// ByInstitutionLogoURL orders the results by the institution_logo_url field.
func ByInstitutionLogoURL(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldInstitutionLogoURL, opts...).ToFunc()
}

// BySortOrder orders the results by the sort_order field.
func BySortOrder(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldSortOrder, opts...).ToFunc()
}

// ByCreatedAt orders the results by the created_at field.
func ByCreatedAt(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldCreatedAt, opts...).ToFunc()
}

// ByUpdatedAt orders the results by the updated_at field.
func ByUpdatedAt(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldUpdatedAt, opts...).ToFunc()
}

// ByUserField orders the results by user field.
func ByUserField(field string, opts ...sql.OrderTermOption) OrderOption {
	return func(s *sql.Selector) {
		sqlgraph.OrderByNeighborTerms(s, newUserStep(), sql.OrderByField(field, opts...))
	}
}

// ByTranslationsCount orders the results by translations count.
func ByTranslationsCount(opts ...sql.OrderTermOption) OrderOption {
	return func(s *sql.Selector) {
		sqlgraph.OrderByNeighborsCount(s, newTranslationsStep(), opts...)
	}
}

// ByTranslations orders the results by translations terms.
func ByTranslations(term sql.OrderTerm, terms ...sql.OrderTerm) OrderOption {
	return func(s *sql.Selector) {
		sqlgraph.OrderByNeighborTerms(s, newTranslationsStep(), append([]sql.OrderTerm{term}, terms...)...)
	}
}

// ByDetailsCount orders the results by details count.
func ByDetailsCount(opts ...sql.OrderTermOption) OrderOption {
	return func(s *sql.Selector) {
		sqlgraph.OrderByNeighborsCount(s, newDetailsStep(), opts...)
	}
}

// ByDetails orders the results by details terms.
func ByDetails(term sql.OrderTerm, terms ...sql.OrderTerm) OrderOption {
	return func(s *sql.Selector) {
		sqlgraph.OrderByNeighborTerms(s, newDetailsStep(), append([]sql.OrderTerm{term}, terms...)...)
	}
}
func newUserStep() *sqlgraph.Step {
	return sqlgraph.NewStep(
		sqlgraph.From(Table, FieldID),
		sqlgraph.To(UserInverseTable, FieldID),
		sqlgraph.Edge(sqlgraph.M2O, true, UserTable, UserColumn),
	)
}
func newTranslationsStep() *sqlgraph.Step {
	return sqlgraph.NewStep(
		sqlgraph.From(Table, FieldID),
		sqlgraph.To(TranslationsInverseTable, FieldID),
		sqlgraph.Edge(sqlgraph.O2M, false, TranslationsTable, TranslationsColumn),
	)
}
func newDetailsStep() *sqlgraph.Step {
	return sqlgraph.NewStep(
		sqlgraph.From(Table, FieldID),
		sqlgraph.To(DetailsInverseTable, FieldID),
		sqlgraph.Edge(sqlgraph.O2M, false, DetailsTable, DetailsColumn),
	)
}
