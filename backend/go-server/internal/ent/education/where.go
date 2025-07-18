// Code generated by ent, DO NOT EDIT.

package education

import (
	"silan-backend/internal/ent/predicate"
	"time"

	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
	"github.com/google/uuid"
)

// ID filters vertices based on their ID field.
func ID(id uuid.UUID) predicate.Education {
	return predicate.Education(sql.FieldEQ(FieldID, id))
}

// IDEQ applies the EQ predicate on the ID field.
func IDEQ(id uuid.UUID) predicate.Education {
	return predicate.Education(sql.FieldEQ(FieldID, id))
}

// IDNEQ applies the NEQ predicate on the ID field.
func IDNEQ(id uuid.UUID) predicate.Education {
	return predicate.Education(sql.FieldNEQ(FieldID, id))
}

// IDIn applies the In predicate on the ID field.
func IDIn(ids ...uuid.UUID) predicate.Education {
	return predicate.Education(sql.FieldIn(FieldID, ids...))
}

// IDNotIn applies the NotIn predicate on the ID field.
func IDNotIn(ids ...uuid.UUID) predicate.Education {
	return predicate.Education(sql.FieldNotIn(FieldID, ids...))
}

// IDGT applies the GT predicate on the ID field.
func IDGT(id uuid.UUID) predicate.Education {
	return predicate.Education(sql.FieldGT(FieldID, id))
}

// IDGTE applies the GTE predicate on the ID field.
func IDGTE(id uuid.UUID) predicate.Education {
	return predicate.Education(sql.FieldGTE(FieldID, id))
}

// IDLT applies the LT predicate on the ID field.
func IDLT(id uuid.UUID) predicate.Education {
	return predicate.Education(sql.FieldLT(FieldID, id))
}

// IDLTE applies the LTE predicate on the ID field.
func IDLTE(id uuid.UUID) predicate.Education {
	return predicate.Education(sql.FieldLTE(FieldID, id))
}

// UserID applies equality check predicate on the "user_id" field. It's identical to UserIDEQ.
func UserID(v uuid.UUID) predicate.Education {
	return predicate.Education(sql.FieldEQ(FieldUserID, v))
}

// Institution applies equality check predicate on the "institution" field. It's identical to InstitutionEQ.
func Institution(v string) predicate.Education {
	return predicate.Education(sql.FieldEQ(FieldInstitution, v))
}

// Degree applies equality check predicate on the "degree" field. It's identical to DegreeEQ.
func Degree(v string) predicate.Education {
	return predicate.Education(sql.FieldEQ(FieldDegree, v))
}

// FieldOfStudy applies equality check predicate on the "field_of_study" field. It's identical to FieldOfStudyEQ.
func FieldOfStudy(v string) predicate.Education {
	return predicate.Education(sql.FieldEQ(FieldFieldOfStudy, v))
}

// StartDate applies equality check predicate on the "start_date" field. It's identical to StartDateEQ.
func StartDate(v time.Time) predicate.Education {
	return predicate.Education(sql.FieldEQ(FieldStartDate, v))
}

// EndDate applies equality check predicate on the "end_date" field. It's identical to EndDateEQ.
func EndDate(v time.Time) predicate.Education {
	return predicate.Education(sql.FieldEQ(FieldEndDate, v))
}

// IsCurrent applies equality check predicate on the "is_current" field. It's identical to IsCurrentEQ.
func IsCurrent(v bool) predicate.Education {
	return predicate.Education(sql.FieldEQ(FieldIsCurrent, v))
}

// Gpa applies equality check predicate on the "gpa" field. It's identical to GpaEQ.
func Gpa(v string) predicate.Education {
	return predicate.Education(sql.FieldEQ(FieldGpa, v))
}

// Location applies equality check predicate on the "location" field. It's identical to LocationEQ.
func Location(v string) predicate.Education {
	return predicate.Education(sql.FieldEQ(FieldLocation, v))
}

// InstitutionWebsite applies equality check predicate on the "institution_website" field. It's identical to InstitutionWebsiteEQ.
func InstitutionWebsite(v string) predicate.Education {
	return predicate.Education(sql.FieldEQ(FieldInstitutionWebsite, v))
}

// InstitutionLogoURL applies equality check predicate on the "institution_logo_url" field. It's identical to InstitutionLogoURLEQ.
func InstitutionLogoURL(v string) predicate.Education {
	return predicate.Education(sql.FieldEQ(FieldInstitutionLogoURL, v))
}

// SortOrder applies equality check predicate on the "sort_order" field. It's identical to SortOrderEQ.
func SortOrder(v int) predicate.Education {
	return predicate.Education(sql.FieldEQ(FieldSortOrder, v))
}

// CreatedAt applies equality check predicate on the "created_at" field. It's identical to CreatedAtEQ.
func CreatedAt(v time.Time) predicate.Education {
	return predicate.Education(sql.FieldEQ(FieldCreatedAt, v))
}

// UpdatedAt applies equality check predicate on the "updated_at" field. It's identical to UpdatedAtEQ.
func UpdatedAt(v time.Time) predicate.Education {
	return predicate.Education(sql.FieldEQ(FieldUpdatedAt, v))
}

// UserIDEQ applies the EQ predicate on the "user_id" field.
func UserIDEQ(v uuid.UUID) predicate.Education {
	return predicate.Education(sql.FieldEQ(FieldUserID, v))
}

// UserIDNEQ applies the NEQ predicate on the "user_id" field.
func UserIDNEQ(v uuid.UUID) predicate.Education {
	return predicate.Education(sql.FieldNEQ(FieldUserID, v))
}

// UserIDIn applies the In predicate on the "user_id" field.
func UserIDIn(vs ...uuid.UUID) predicate.Education {
	return predicate.Education(sql.FieldIn(FieldUserID, vs...))
}

// UserIDNotIn applies the NotIn predicate on the "user_id" field.
func UserIDNotIn(vs ...uuid.UUID) predicate.Education {
	return predicate.Education(sql.FieldNotIn(FieldUserID, vs...))
}

// InstitutionEQ applies the EQ predicate on the "institution" field.
func InstitutionEQ(v string) predicate.Education {
	return predicate.Education(sql.FieldEQ(FieldInstitution, v))
}

// InstitutionNEQ applies the NEQ predicate on the "institution" field.
func InstitutionNEQ(v string) predicate.Education {
	return predicate.Education(sql.FieldNEQ(FieldInstitution, v))
}

// InstitutionIn applies the In predicate on the "institution" field.
func InstitutionIn(vs ...string) predicate.Education {
	return predicate.Education(sql.FieldIn(FieldInstitution, vs...))
}

// InstitutionNotIn applies the NotIn predicate on the "institution" field.
func InstitutionNotIn(vs ...string) predicate.Education {
	return predicate.Education(sql.FieldNotIn(FieldInstitution, vs...))
}

// InstitutionGT applies the GT predicate on the "institution" field.
func InstitutionGT(v string) predicate.Education {
	return predicate.Education(sql.FieldGT(FieldInstitution, v))
}

// InstitutionGTE applies the GTE predicate on the "institution" field.
func InstitutionGTE(v string) predicate.Education {
	return predicate.Education(sql.FieldGTE(FieldInstitution, v))
}

// InstitutionLT applies the LT predicate on the "institution" field.
func InstitutionLT(v string) predicate.Education {
	return predicate.Education(sql.FieldLT(FieldInstitution, v))
}

// InstitutionLTE applies the LTE predicate on the "institution" field.
func InstitutionLTE(v string) predicate.Education {
	return predicate.Education(sql.FieldLTE(FieldInstitution, v))
}

// InstitutionContains applies the Contains predicate on the "institution" field.
func InstitutionContains(v string) predicate.Education {
	return predicate.Education(sql.FieldContains(FieldInstitution, v))
}

// InstitutionHasPrefix applies the HasPrefix predicate on the "institution" field.
func InstitutionHasPrefix(v string) predicate.Education {
	return predicate.Education(sql.FieldHasPrefix(FieldInstitution, v))
}

// InstitutionHasSuffix applies the HasSuffix predicate on the "institution" field.
func InstitutionHasSuffix(v string) predicate.Education {
	return predicate.Education(sql.FieldHasSuffix(FieldInstitution, v))
}

// InstitutionEqualFold applies the EqualFold predicate on the "institution" field.
func InstitutionEqualFold(v string) predicate.Education {
	return predicate.Education(sql.FieldEqualFold(FieldInstitution, v))
}

// InstitutionContainsFold applies the ContainsFold predicate on the "institution" field.
func InstitutionContainsFold(v string) predicate.Education {
	return predicate.Education(sql.FieldContainsFold(FieldInstitution, v))
}

// DegreeEQ applies the EQ predicate on the "degree" field.
func DegreeEQ(v string) predicate.Education {
	return predicate.Education(sql.FieldEQ(FieldDegree, v))
}

// DegreeNEQ applies the NEQ predicate on the "degree" field.
func DegreeNEQ(v string) predicate.Education {
	return predicate.Education(sql.FieldNEQ(FieldDegree, v))
}

// DegreeIn applies the In predicate on the "degree" field.
func DegreeIn(vs ...string) predicate.Education {
	return predicate.Education(sql.FieldIn(FieldDegree, vs...))
}

// DegreeNotIn applies the NotIn predicate on the "degree" field.
func DegreeNotIn(vs ...string) predicate.Education {
	return predicate.Education(sql.FieldNotIn(FieldDegree, vs...))
}

// DegreeGT applies the GT predicate on the "degree" field.
func DegreeGT(v string) predicate.Education {
	return predicate.Education(sql.FieldGT(FieldDegree, v))
}

// DegreeGTE applies the GTE predicate on the "degree" field.
func DegreeGTE(v string) predicate.Education {
	return predicate.Education(sql.FieldGTE(FieldDegree, v))
}

// DegreeLT applies the LT predicate on the "degree" field.
func DegreeLT(v string) predicate.Education {
	return predicate.Education(sql.FieldLT(FieldDegree, v))
}

// DegreeLTE applies the LTE predicate on the "degree" field.
func DegreeLTE(v string) predicate.Education {
	return predicate.Education(sql.FieldLTE(FieldDegree, v))
}

// DegreeContains applies the Contains predicate on the "degree" field.
func DegreeContains(v string) predicate.Education {
	return predicate.Education(sql.FieldContains(FieldDegree, v))
}

// DegreeHasPrefix applies the HasPrefix predicate on the "degree" field.
func DegreeHasPrefix(v string) predicate.Education {
	return predicate.Education(sql.FieldHasPrefix(FieldDegree, v))
}

// DegreeHasSuffix applies the HasSuffix predicate on the "degree" field.
func DegreeHasSuffix(v string) predicate.Education {
	return predicate.Education(sql.FieldHasSuffix(FieldDegree, v))
}

// DegreeEqualFold applies the EqualFold predicate on the "degree" field.
func DegreeEqualFold(v string) predicate.Education {
	return predicate.Education(sql.FieldEqualFold(FieldDegree, v))
}

// DegreeContainsFold applies the ContainsFold predicate on the "degree" field.
func DegreeContainsFold(v string) predicate.Education {
	return predicate.Education(sql.FieldContainsFold(FieldDegree, v))
}

// FieldOfStudyEQ applies the EQ predicate on the "field_of_study" field.
func FieldOfStudyEQ(v string) predicate.Education {
	return predicate.Education(sql.FieldEQ(FieldFieldOfStudy, v))
}

// FieldOfStudyNEQ applies the NEQ predicate on the "field_of_study" field.
func FieldOfStudyNEQ(v string) predicate.Education {
	return predicate.Education(sql.FieldNEQ(FieldFieldOfStudy, v))
}

// FieldOfStudyIn applies the In predicate on the "field_of_study" field.
func FieldOfStudyIn(vs ...string) predicate.Education {
	return predicate.Education(sql.FieldIn(FieldFieldOfStudy, vs...))
}

// FieldOfStudyNotIn applies the NotIn predicate on the "field_of_study" field.
func FieldOfStudyNotIn(vs ...string) predicate.Education {
	return predicate.Education(sql.FieldNotIn(FieldFieldOfStudy, vs...))
}

// FieldOfStudyGT applies the GT predicate on the "field_of_study" field.
func FieldOfStudyGT(v string) predicate.Education {
	return predicate.Education(sql.FieldGT(FieldFieldOfStudy, v))
}

// FieldOfStudyGTE applies the GTE predicate on the "field_of_study" field.
func FieldOfStudyGTE(v string) predicate.Education {
	return predicate.Education(sql.FieldGTE(FieldFieldOfStudy, v))
}

// FieldOfStudyLT applies the LT predicate on the "field_of_study" field.
func FieldOfStudyLT(v string) predicate.Education {
	return predicate.Education(sql.FieldLT(FieldFieldOfStudy, v))
}

// FieldOfStudyLTE applies the LTE predicate on the "field_of_study" field.
func FieldOfStudyLTE(v string) predicate.Education {
	return predicate.Education(sql.FieldLTE(FieldFieldOfStudy, v))
}

// FieldOfStudyContains applies the Contains predicate on the "field_of_study" field.
func FieldOfStudyContains(v string) predicate.Education {
	return predicate.Education(sql.FieldContains(FieldFieldOfStudy, v))
}

// FieldOfStudyHasPrefix applies the HasPrefix predicate on the "field_of_study" field.
func FieldOfStudyHasPrefix(v string) predicate.Education {
	return predicate.Education(sql.FieldHasPrefix(FieldFieldOfStudy, v))
}

// FieldOfStudyHasSuffix applies the HasSuffix predicate on the "field_of_study" field.
func FieldOfStudyHasSuffix(v string) predicate.Education {
	return predicate.Education(sql.FieldHasSuffix(FieldFieldOfStudy, v))
}

// FieldOfStudyIsNil applies the IsNil predicate on the "field_of_study" field.
func FieldOfStudyIsNil() predicate.Education {
	return predicate.Education(sql.FieldIsNull(FieldFieldOfStudy))
}

// FieldOfStudyNotNil applies the NotNil predicate on the "field_of_study" field.
func FieldOfStudyNotNil() predicate.Education {
	return predicate.Education(sql.FieldNotNull(FieldFieldOfStudy))
}

// FieldOfStudyEqualFold applies the EqualFold predicate on the "field_of_study" field.
func FieldOfStudyEqualFold(v string) predicate.Education {
	return predicate.Education(sql.FieldEqualFold(FieldFieldOfStudy, v))
}

// FieldOfStudyContainsFold applies the ContainsFold predicate on the "field_of_study" field.
func FieldOfStudyContainsFold(v string) predicate.Education {
	return predicate.Education(sql.FieldContainsFold(FieldFieldOfStudy, v))
}

// StartDateEQ applies the EQ predicate on the "start_date" field.
func StartDateEQ(v time.Time) predicate.Education {
	return predicate.Education(sql.FieldEQ(FieldStartDate, v))
}

// StartDateNEQ applies the NEQ predicate on the "start_date" field.
func StartDateNEQ(v time.Time) predicate.Education {
	return predicate.Education(sql.FieldNEQ(FieldStartDate, v))
}

// StartDateIn applies the In predicate on the "start_date" field.
func StartDateIn(vs ...time.Time) predicate.Education {
	return predicate.Education(sql.FieldIn(FieldStartDate, vs...))
}

// StartDateNotIn applies the NotIn predicate on the "start_date" field.
func StartDateNotIn(vs ...time.Time) predicate.Education {
	return predicate.Education(sql.FieldNotIn(FieldStartDate, vs...))
}

// StartDateGT applies the GT predicate on the "start_date" field.
func StartDateGT(v time.Time) predicate.Education {
	return predicate.Education(sql.FieldGT(FieldStartDate, v))
}

// StartDateGTE applies the GTE predicate on the "start_date" field.
func StartDateGTE(v time.Time) predicate.Education {
	return predicate.Education(sql.FieldGTE(FieldStartDate, v))
}

// StartDateLT applies the LT predicate on the "start_date" field.
func StartDateLT(v time.Time) predicate.Education {
	return predicate.Education(sql.FieldLT(FieldStartDate, v))
}

// StartDateLTE applies the LTE predicate on the "start_date" field.
func StartDateLTE(v time.Time) predicate.Education {
	return predicate.Education(sql.FieldLTE(FieldStartDate, v))
}

// StartDateIsNil applies the IsNil predicate on the "start_date" field.
func StartDateIsNil() predicate.Education {
	return predicate.Education(sql.FieldIsNull(FieldStartDate))
}

// StartDateNotNil applies the NotNil predicate on the "start_date" field.
func StartDateNotNil() predicate.Education {
	return predicate.Education(sql.FieldNotNull(FieldStartDate))
}

// EndDateEQ applies the EQ predicate on the "end_date" field.
func EndDateEQ(v time.Time) predicate.Education {
	return predicate.Education(sql.FieldEQ(FieldEndDate, v))
}

// EndDateNEQ applies the NEQ predicate on the "end_date" field.
func EndDateNEQ(v time.Time) predicate.Education {
	return predicate.Education(sql.FieldNEQ(FieldEndDate, v))
}

// EndDateIn applies the In predicate on the "end_date" field.
func EndDateIn(vs ...time.Time) predicate.Education {
	return predicate.Education(sql.FieldIn(FieldEndDate, vs...))
}

// EndDateNotIn applies the NotIn predicate on the "end_date" field.
func EndDateNotIn(vs ...time.Time) predicate.Education {
	return predicate.Education(sql.FieldNotIn(FieldEndDate, vs...))
}

// EndDateGT applies the GT predicate on the "end_date" field.
func EndDateGT(v time.Time) predicate.Education {
	return predicate.Education(sql.FieldGT(FieldEndDate, v))
}

// EndDateGTE applies the GTE predicate on the "end_date" field.
func EndDateGTE(v time.Time) predicate.Education {
	return predicate.Education(sql.FieldGTE(FieldEndDate, v))
}

// EndDateLT applies the LT predicate on the "end_date" field.
func EndDateLT(v time.Time) predicate.Education {
	return predicate.Education(sql.FieldLT(FieldEndDate, v))
}

// EndDateLTE applies the LTE predicate on the "end_date" field.
func EndDateLTE(v time.Time) predicate.Education {
	return predicate.Education(sql.FieldLTE(FieldEndDate, v))
}

// EndDateIsNil applies the IsNil predicate on the "end_date" field.
func EndDateIsNil() predicate.Education {
	return predicate.Education(sql.FieldIsNull(FieldEndDate))
}

// EndDateNotNil applies the NotNil predicate on the "end_date" field.
func EndDateNotNil() predicate.Education {
	return predicate.Education(sql.FieldNotNull(FieldEndDate))
}

// IsCurrentEQ applies the EQ predicate on the "is_current" field.
func IsCurrentEQ(v bool) predicate.Education {
	return predicate.Education(sql.FieldEQ(FieldIsCurrent, v))
}

// IsCurrentNEQ applies the NEQ predicate on the "is_current" field.
func IsCurrentNEQ(v bool) predicate.Education {
	return predicate.Education(sql.FieldNEQ(FieldIsCurrent, v))
}

// GpaEQ applies the EQ predicate on the "gpa" field.
func GpaEQ(v string) predicate.Education {
	return predicate.Education(sql.FieldEQ(FieldGpa, v))
}

// GpaNEQ applies the NEQ predicate on the "gpa" field.
func GpaNEQ(v string) predicate.Education {
	return predicate.Education(sql.FieldNEQ(FieldGpa, v))
}

// GpaIn applies the In predicate on the "gpa" field.
func GpaIn(vs ...string) predicate.Education {
	return predicate.Education(sql.FieldIn(FieldGpa, vs...))
}

// GpaNotIn applies the NotIn predicate on the "gpa" field.
func GpaNotIn(vs ...string) predicate.Education {
	return predicate.Education(sql.FieldNotIn(FieldGpa, vs...))
}

// GpaGT applies the GT predicate on the "gpa" field.
func GpaGT(v string) predicate.Education {
	return predicate.Education(sql.FieldGT(FieldGpa, v))
}

// GpaGTE applies the GTE predicate on the "gpa" field.
func GpaGTE(v string) predicate.Education {
	return predicate.Education(sql.FieldGTE(FieldGpa, v))
}

// GpaLT applies the LT predicate on the "gpa" field.
func GpaLT(v string) predicate.Education {
	return predicate.Education(sql.FieldLT(FieldGpa, v))
}

// GpaLTE applies the LTE predicate on the "gpa" field.
func GpaLTE(v string) predicate.Education {
	return predicate.Education(sql.FieldLTE(FieldGpa, v))
}

// GpaContains applies the Contains predicate on the "gpa" field.
func GpaContains(v string) predicate.Education {
	return predicate.Education(sql.FieldContains(FieldGpa, v))
}

// GpaHasPrefix applies the HasPrefix predicate on the "gpa" field.
func GpaHasPrefix(v string) predicate.Education {
	return predicate.Education(sql.FieldHasPrefix(FieldGpa, v))
}

// GpaHasSuffix applies the HasSuffix predicate on the "gpa" field.
func GpaHasSuffix(v string) predicate.Education {
	return predicate.Education(sql.FieldHasSuffix(FieldGpa, v))
}

// GpaIsNil applies the IsNil predicate on the "gpa" field.
func GpaIsNil() predicate.Education {
	return predicate.Education(sql.FieldIsNull(FieldGpa))
}

// GpaNotNil applies the NotNil predicate on the "gpa" field.
func GpaNotNil() predicate.Education {
	return predicate.Education(sql.FieldNotNull(FieldGpa))
}

// GpaEqualFold applies the EqualFold predicate on the "gpa" field.
func GpaEqualFold(v string) predicate.Education {
	return predicate.Education(sql.FieldEqualFold(FieldGpa, v))
}

// GpaContainsFold applies the ContainsFold predicate on the "gpa" field.
func GpaContainsFold(v string) predicate.Education {
	return predicate.Education(sql.FieldContainsFold(FieldGpa, v))
}

// LocationEQ applies the EQ predicate on the "location" field.
func LocationEQ(v string) predicate.Education {
	return predicate.Education(sql.FieldEQ(FieldLocation, v))
}

// LocationNEQ applies the NEQ predicate on the "location" field.
func LocationNEQ(v string) predicate.Education {
	return predicate.Education(sql.FieldNEQ(FieldLocation, v))
}

// LocationIn applies the In predicate on the "location" field.
func LocationIn(vs ...string) predicate.Education {
	return predicate.Education(sql.FieldIn(FieldLocation, vs...))
}

// LocationNotIn applies the NotIn predicate on the "location" field.
func LocationNotIn(vs ...string) predicate.Education {
	return predicate.Education(sql.FieldNotIn(FieldLocation, vs...))
}

// LocationGT applies the GT predicate on the "location" field.
func LocationGT(v string) predicate.Education {
	return predicate.Education(sql.FieldGT(FieldLocation, v))
}

// LocationGTE applies the GTE predicate on the "location" field.
func LocationGTE(v string) predicate.Education {
	return predicate.Education(sql.FieldGTE(FieldLocation, v))
}

// LocationLT applies the LT predicate on the "location" field.
func LocationLT(v string) predicate.Education {
	return predicate.Education(sql.FieldLT(FieldLocation, v))
}

// LocationLTE applies the LTE predicate on the "location" field.
func LocationLTE(v string) predicate.Education {
	return predicate.Education(sql.FieldLTE(FieldLocation, v))
}

// LocationContains applies the Contains predicate on the "location" field.
func LocationContains(v string) predicate.Education {
	return predicate.Education(sql.FieldContains(FieldLocation, v))
}

// LocationHasPrefix applies the HasPrefix predicate on the "location" field.
func LocationHasPrefix(v string) predicate.Education {
	return predicate.Education(sql.FieldHasPrefix(FieldLocation, v))
}

// LocationHasSuffix applies the HasSuffix predicate on the "location" field.
func LocationHasSuffix(v string) predicate.Education {
	return predicate.Education(sql.FieldHasSuffix(FieldLocation, v))
}

// LocationIsNil applies the IsNil predicate on the "location" field.
func LocationIsNil() predicate.Education {
	return predicate.Education(sql.FieldIsNull(FieldLocation))
}

// LocationNotNil applies the NotNil predicate on the "location" field.
func LocationNotNil() predicate.Education {
	return predicate.Education(sql.FieldNotNull(FieldLocation))
}

// LocationEqualFold applies the EqualFold predicate on the "location" field.
func LocationEqualFold(v string) predicate.Education {
	return predicate.Education(sql.FieldEqualFold(FieldLocation, v))
}

// LocationContainsFold applies the ContainsFold predicate on the "location" field.
func LocationContainsFold(v string) predicate.Education {
	return predicate.Education(sql.FieldContainsFold(FieldLocation, v))
}

// InstitutionWebsiteEQ applies the EQ predicate on the "institution_website" field.
func InstitutionWebsiteEQ(v string) predicate.Education {
	return predicate.Education(sql.FieldEQ(FieldInstitutionWebsite, v))
}

// InstitutionWebsiteNEQ applies the NEQ predicate on the "institution_website" field.
func InstitutionWebsiteNEQ(v string) predicate.Education {
	return predicate.Education(sql.FieldNEQ(FieldInstitutionWebsite, v))
}

// InstitutionWebsiteIn applies the In predicate on the "institution_website" field.
func InstitutionWebsiteIn(vs ...string) predicate.Education {
	return predicate.Education(sql.FieldIn(FieldInstitutionWebsite, vs...))
}

// InstitutionWebsiteNotIn applies the NotIn predicate on the "institution_website" field.
func InstitutionWebsiteNotIn(vs ...string) predicate.Education {
	return predicate.Education(sql.FieldNotIn(FieldInstitutionWebsite, vs...))
}

// InstitutionWebsiteGT applies the GT predicate on the "institution_website" field.
func InstitutionWebsiteGT(v string) predicate.Education {
	return predicate.Education(sql.FieldGT(FieldInstitutionWebsite, v))
}

// InstitutionWebsiteGTE applies the GTE predicate on the "institution_website" field.
func InstitutionWebsiteGTE(v string) predicate.Education {
	return predicate.Education(sql.FieldGTE(FieldInstitutionWebsite, v))
}

// InstitutionWebsiteLT applies the LT predicate on the "institution_website" field.
func InstitutionWebsiteLT(v string) predicate.Education {
	return predicate.Education(sql.FieldLT(FieldInstitutionWebsite, v))
}

// InstitutionWebsiteLTE applies the LTE predicate on the "institution_website" field.
func InstitutionWebsiteLTE(v string) predicate.Education {
	return predicate.Education(sql.FieldLTE(FieldInstitutionWebsite, v))
}

// InstitutionWebsiteContains applies the Contains predicate on the "institution_website" field.
func InstitutionWebsiteContains(v string) predicate.Education {
	return predicate.Education(sql.FieldContains(FieldInstitutionWebsite, v))
}

// InstitutionWebsiteHasPrefix applies the HasPrefix predicate on the "institution_website" field.
func InstitutionWebsiteHasPrefix(v string) predicate.Education {
	return predicate.Education(sql.FieldHasPrefix(FieldInstitutionWebsite, v))
}

// InstitutionWebsiteHasSuffix applies the HasSuffix predicate on the "institution_website" field.
func InstitutionWebsiteHasSuffix(v string) predicate.Education {
	return predicate.Education(sql.FieldHasSuffix(FieldInstitutionWebsite, v))
}

// InstitutionWebsiteIsNil applies the IsNil predicate on the "institution_website" field.
func InstitutionWebsiteIsNil() predicate.Education {
	return predicate.Education(sql.FieldIsNull(FieldInstitutionWebsite))
}

// InstitutionWebsiteNotNil applies the NotNil predicate on the "institution_website" field.
func InstitutionWebsiteNotNil() predicate.Education {
	return predicate.Education(sql.FieldNotNull(FieldInstitutionWebsite))
}

// InstitutionWebsiteEqualFold applies the EqualFold predicate on the "institution_website" field.
func InstitutionWebsiteEqualFold(v string) predicate.Education {
	return predicate.Education(sql.FieldEqualFold(FieldInstitutionWebsite, v))
}

// InstitutionWebsiteContainsFold applies the ContainsFold predicate on the "institution_website" field.
func InstitutionWebsiteContainsFold(v string) predicate.Education {
	return predicate.Education(sql.FieldContainsFold(FieldInstitutionWebsite, v))
}

// InstitutionLogoURLEQ applies the EQ predicate on the "institution_logo_url" field.
func InstitutionLogoURLEQ(v string) predicate.Education {
	return predicate.Education(sql.FieldEQ(FieldInstitutionLogoURL, v))
}

// InstitutionLogoURLNEQ applies the NEQ predicate on the "institution_logo_url" field.
func InstitutionLogoURLNEQ(v string) predicate.Education {
	return predicate.Education(sql.FieldNEQ(FieldInstitutionLogoURL, v))
}

// InstitutionLogoURLIn applies the In predicate on the "institution_logo_url" field.
func InstitutionLogoURLIn(vs ...string) predicate.Education {
	return predicate.Education(sql.FieldIn(FieldInstitutionLogoURL, vs...))
}

// InstitutionLogoURLNotIn applies the NotIn predicate on the "institution_logo_url" field.
func InstitutionLogoURLNotIn(vs ...string) predicate.Education {
	return predicate.Education(sql.FieldNotIn(FieldInstitutionLogoURL, vs...))
}

// InstitutionLogoURLGT applies the GT predicate on the "institution_logo_url" field.
func InstitutionLogoURLGT(v string) predicate.Education {
	return predicate.Education(sql.FieldGT(FieldInstitutionLogoURL, v))
}

// InstitutionLogoURLGTE applies the GTE predicate on the "institution_logo_url" field.
func InstitutionLogoURLGTE(v string) predicate.Education {
	return predicate.Education(sql.FieldGTE(FieldInstitutionLogoURL, v))
}

// InstitutionLogoURLLT applies the LT predicate on the "institution_logo_url" field.
func InstitutionLogoURLLT(v string) predicate.Education {
	return predicate.Education(sql.FieldLT(FieldInstitutionLogoURL, v))
}

// InstitutionLogoURLLTE applies the LTE predicate on the "institution_logo_url" field.
func InstitutionLogoURLLTE(v string) predicate.Education {
	return predicate.Education(sql.FieldLTE(FieldInstitutionLogoURL, v))
}

// InstitutionLogoURLContains applies the Contains predicate on the "institution_logo_url" field.
func InstitutionLogoURLContains(v string) predicate.Education {
	return predicate.Education(sql.FieldContains(FieldInstitutionLogoURL, v))
}

// InstitutionLogoURLHasPrefix applies the HasPrefix predicate on the "institution_logo_url" field.
func InstitutionLogoURLHasPrefix(v string) predicate.Education {
	return predicate.Education(sql.FieldHasPrefix(FieldInstitutionLogoURL, v))
}

// InstitutionLogoURLHasSuffix applies the HasSuffix predicate on the "institution_logo_url" field.
func InstitutionLogoURLHasSuffix(v string) predicate.Education {
	return predicate.Education(sql.FieldHasSuffix(FieldInstitutionLogoURL, v))
}

// InstitutionLogoURLIsNil applies the IsNil predicate on the "institution_logo_url" field.
func InstitutionLogoURLIsNil() predicate.Education {
	return predicate.Education(sql.FieldIsNull(FieldInstitutionLogoURL))
}

// InstitutionLogoURLNotNil applies the NotNil predicate on the "institution_logo_url" field.
func InstitutionLogoURLNotNil() predicate.Education {
	return predicate.Education(sql.FieldNotNull(FieldInstitutionLogoURL))
}

// InstitutionLogoURLEqualFold applies the EqualFold predicate on the "institution_logo_url" field.
func InstitutionLogoURLEqualFold(v string) predicate.Education {
	return predicate.Education(sql.FieldEqualFold(FieldInstitutionLogoURL, v))
}

// InstitutionLogoURLContainsFold applies the ContainsFold predicate on the "institution_logo_url" field.
func InstitutionLogoURLContainsFold(v string) predicate.Education {
	return predicate.Education(sql.FieldContainsFold(FieldInstitutionLogoURL, v))
}

// SortOrderEQ applies the EQ predicate on the "sort_order" field.
func SortOrderEQ(v int) predicate.Education {
	return predicate.Education(sql.FieldEQ(FieldSortOrder, v))
}

// SortOrderNEQ applies the NEQ predicate on the "sort_order" field.
func SortOrderNEQ(v int) predicate.Education {
	return predicate.Education(sql.FieldNEQ(FieldSortOrder, v))
}

// SortOrderIn applies the In predicate on the "sort_order" field.
func SortOrderIn(vs ...int) predicate.Education {
	return predicate.Education(sql.FieldIn(FieldSortOrder, vs...))
}

// SortOrderNotIn applies the NotIn predicate on the "sort_order" field.
func SortOrderNotIn(vs ...int) predicate.Education {
	return predicate.Education(sql.FieldNotIn(FieldSortOrder, vs...))
}

// SortOrderGT applies the GT predicate on the "sort_order" field.
func SortOrderGT(v int) predicate.Education {
	return predicate.Education(sql.FieldGT(FieldSortOrder, v))
}

// SortOrderGTE applies the GTE predicate on the "sort_order" field.
func SortOrderGTE(v int) predicate.Education {
	return predicate.Education(sql.FieldGTE(FieldSortOrder, v))
}

// SortOrderLT applies the LT predicate on the "sort_order" field.
func SortOrderLT(v int) predicate.Education {
	return predicate.Education(sql.FieldLT(FieldSortOrder, v))
}

// SortOrderLTE applies the LTE predicate on the "sort_order" field.
func SortOrderLTE(v int) predicate.Education {
	return predicate.Education(sql.FieldLTE(FieldSortOrder, v))
}

// CreatedAtEQ applies the EQ predicate on the "created_at" field.
func CreatedAtEQ(v time.Time) predicate.Education {
	return predicate.Education(sql.FieldEQ(FieldCreatedAt, v))
}

// CreatedAtNEQ applies the NEQ predicate on the "created_at" field.
func CreatedAtNEQ(v time.Time) predicate.Education {
	return predicate.Education(sql.FieldNEQ(FieldCreatedAt, v))
}

// CreatedAtIn applies the In predicate on the "created_at" field.
func CreatedAtIn(vs ...time.Time) predicate.Education {
	return predicate.Education(sql.FieldIn(FieldCreatedAt, vs...))
}

// CreatedAtNotIn applies the NotIn predicate on the "created_at" field.
func CreatedAtNotIn(vs ...time.Time) predicate.Education {
	return predicate.Education(sql.FieldNotIn(FieldCreatedAt, vs...))
}

// CreatedAtGT applies the GT predicate on the "created_at" field.
func CreatedAtGT(v time.Time) predicate.Education {
	return predicate.Education(sql.FieldGT(FieldCreatedAt, v))
}

// CreatedAtGTE applies the GTE predicate on the "created_at" field.
func CreatedAtGTE(v time.Time) predicate.Education {
	return predicate.Education(sql.FieldGTE(FieldCreatedAt, v))
}

// CreatedAtLT applies the LT predicate on the "created_at" field.
func CreatedAtLT(v time.Time) predicate.Education {
	return predicate.Education(sql.FieldLT(FieldCreatedAt, v))
}

// CreatedAtLTE applies the LTE predicate on the "created_at" field.
func CreatedAtLTE(v time.Time) predicate.Education {
	return predicate.Education(sql.FieldLTE(FieldCreatedAt, v))
}

// UpdatedAtEQ applies the EQ predicate on the "updated_at" field.
func UpdatedAtEQ(v time.Time) predicate.Education {
	return predicate.Education(sql.FieldEQ(FieldUpdatedAt, v))
}

// UpdatedAtNEQ applies the NEQ predicate on the "updated_at" field.
func UpdatedAtNEQ(v time.Time) predicate.Education {
	return predicate.Education(sql.FieldNEQ(FieldUpdatedAt, v))
}

// UpdatedAtIn applies the In predicate on the "updated_at" field.
func UpdatedAtIn(vs ...time.Time) predicate.Education {
	return predicate.Education(sql.FieldIn(FieldUpdatedAt, vs...))
}

// UpdatedAtNotIn applies the NotIn predicate on the "updated_at" field.
func UpdatedAtNotIn(vs ...time.Time) predicate.Education {
	return predicate.Education(sql.FieldNotIn(FieldUpdatedAt, vs...))
}

// UpdatedAtGT applies the GT predicate on the "updated_at" field.
func UpdatedAtGT(v time.Time) predicate.Education {
	return predicate.Education(sql.FieldGT(FieldUpdatedAt, v))
}

// UpdatedAtGTE applies the GTE predicate on the "updated_at" field.
func UpdatedAtGTE(v time.Time) predicate.Education {
	return predicate.Education(sql.FieldGTE(FieldUpdatedAt, v))
}

// UpdatedAtLT applies the LT predicate on the "updated_at" field.
func UpdatedAtLT(v time.Time) predicate.Education {
	return predicate.Education(sql.FieldLT(FieldUpdatedAt, v))
}

// UpdatedAtLTE applies the LTE predicate on the "updated_at" field.
func UpdatedAtLTE(v time.Time) predicate.Education {
	return predicate.Education(sql.FieldLTE(FieldUpdatedAt, v))
}

// HasUser applies the HasEdge predicate on the "user" edge.
func HasUser() predicate.Education {
	return predicate.Education(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, UserTable, UserColumn),
		)
		sqlgraph.HasNeighbors(s, step)
	})
}

// HasUserWith applies the HasEdge predicate on the "user" edge with a given conditions (other predicates).
func HasUserWith(preds ...predicate.User) predicate.Education {
	return predicate.Education(func(s *sql.Selector) {
		step := newUserStep()
		sqlgraph.HasNeighborsWith(s, step, func(s *sql.Selector) {
			for _, p := range preds {
				p(s)
			}
		})
	})
}

// HasTranslations applies the HasEdge predicate on the "translations" edge.
func HasTranslations() predicate.Education {
	return predicate.Education(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.Edge(sqlgraph.O2M, false, TranslationsTable, TranslationsColumn),
		)
		sqlgraph.HasNeighbors(s, step)
	})
}

// HasTranslationsWith applies the HasEdge predicate on the "translations" edge with a given conditions (other predicates).
func HasTranslationsWith(preds ...predicate.EducationTranslation) predicate.Education {
	return predicate.Education(func(s *sql.Selector) {
		step := newTranslationsStep()
		sqlgraph.HasNeighborsWith(s, step, func(s *sql.Selector) {
			for _, p := range preds {
				p(s)
			}
		})
	})
}

// HasDetails applies the HasEdge predicate on the "details" edge.
func HasDetails() predicate.Education {
	return predicate.Education(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.Edge(sqlgraph.O2M, false, DetailsTable, DetailsColumn),
		)
		sqlgraph.HasNeighbors(s, step)
	})
}

// HasDetailsWith applies the HasEdge predicate on the "details" edge with a given conditions (other predicates).
func HasDetailsWith(preds ...predicate.EducationDetail) predicate.Education {
	return predicate.Education(func(s *sql.Selector) {
		step := newDetailsStep()
		sqlgraph.HasNeighborsWith(s, step, func(s *sql.Selector) {
			for _, p := range preds {
				p(s)
			}
		})
	})
}

// And groups predicates with the AND operator between them.
func And(predicates ...predicate.Education) predicate.Education {
	return predicate.Education(sql.AndPredicates(predicates...))
}

// Or groups predicates with the OR operator between them.
func Or(predicates ...predicate.Education) predicate.Education {
	return predicate.Education(sql.OrPredicates(predicates...))
}

// Not applies the not operator on the given predicate.
func Not(p predicate.Education) predicate.Education {
	return predicate.Education(sql.NotPredicates(p))
}
