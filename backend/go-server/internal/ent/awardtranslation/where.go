// Code generated by ent, DO NOT EDIT.

package awardtranslation

import (
	"silan-backend/internal/ent/predicate"
	"time"

	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
	"github.com/google/uuid"
)

// ID filters vertices based on their ID field.
func ID(id uuid.UUID) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldEQ(FieldID, id))
}

// IDEQ applies the EQ predicate on the ID field.
func IDEQ(id uuid.UUID) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldEQ(FieldID, id))
}

// IDNEQ applies the NEQ predicate on the ID field.
func IDNEQ(id uuid.UUID) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldNEQ(FieldID, id))
}

// IDIn applies the In predicate on the ID field.
func IDIn(ids ...uuid.UUID) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldIn(FieldID, ids...))
}

// IDNotIn applies the NotIn predicate on the ID field.
func IDNotIn(ids ...uuid.UUID) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldNotIn(FieldID, ids...))
}

// IDGT applies the GT predicate on the ID field.
func IDGT(id uuid.UUID) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldGT(FieldID, id))
}

// IDGTE applies the GTE predicate on the ID field.
func IDGTE(id uuid.UUID) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldGTE(FieldID, id))
}

// IDLT applies the LT predicate on the ID field.
func IDLT(id uuid.UUID) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldLT(FieldID, id))
}

// IDLTE applies the LTE predicate on the ID field.
func IDLTE(id uuid.UUID) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldLTE(FieldID, id))
}

// AwardID applies equality check predicate on the "award_id" field. It's identical to AwardIDEQ.
func AwardID(v uuid.UUID) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldEQ(FieldAwardID, v))
}

// LanguageCode applies equality check predicate on the "language_code" field. It's identical to LanguageCodeEQ.
func LanguageCode(v string) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldEQ(FieldLanguageCode, v))
}

// Title applies equality check predicate on the "title" field. It's identical to TitleEQ.
func Title(v string) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldEQ(FieldTitle, v))
}

// AwardingOrganization applies equality check predicate on the "awarding_organization" field. It's identical to AwardingOrganizationEQ.
func AwardingOrganization(v string) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldEQ(FieldAwardingOrganization, v))
}

// AwardType applies equality check predicate on the "award_type" field. It's identical to AwardTypeEQ.
func AwardType(v string) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldEQ(FieldAwardType, v))
}

// Description applies equality check predicate on the "description" field. It's identical to DescriptionEQ.
func Description(v string) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldEQ(FieldDescription, v))
}

// CreatedAt applies equality check predicate on the "created_at" field. It's identical to CreatedAtEQ.
func CreatedAt(v time.Time) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldEQ(FieldCreatedAt, v))
}

// AwardIDEQ applies the EQ predicate on the "award_id" field.
func AwardIDEQ(v uuid.UUID) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldEQ(FieldAwardID, v))
}

// AwardIDNEQ applies the NEQ predicate on the "award_id" field.
func AwardIDNEQ(v uuid.UUID) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldNEQ(FieldAwardID, v))
}

// AwardIDIn applies the In predicate on the "award_id" field.
func AwardIDIn(vs ...uuid.UUID) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldIn(FieldAwardID, vs...))
}

// AwardIDNotIn applies the NotIn predicate on the "award_id" field.
func AwardIDNotIn(vs ...uuid.UUID) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldNotIn(FieldAwardID, vs...))
}

// LanguageCodeEQ applies the EQ predicate on the "language_code" field.
func LanguageCodeEQ(v string) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldEQ(FieldLanguageCode, v))
}

// LanguageCodeNEQ applies the NEQ predicate on the "language_code" field.
func LanguageCodeNEQ(v string) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldNEQ(FieldLanguageCode, v))
}

// LanguageCodeIn applies the In predicate on the "language_code" field.
func LanguageCodeIn(vs ...string) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldIn(FieldLanguageCode, vs...))
}

// LanguageCodeNotIn applies the NotIn predicate on the "language_code" field.
func LanguageCodeNotIn(vs ...string) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldNotIn(FieldLanguageCode, vs...))
}

// LanguageCodeGT applies the GT predicate on the "language_code" field.
func LanguageCodeGT(v string) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldGT(FieldLanguageCode, v))
}

// LanguageCodeGTE applies the GTE predicate on the "language_code" field.
func LanguageCodeGTE(v string) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldGTE(FieldLanguageCode, v))
}

// LanguageCodeLT applies the LT predicate on the "language_code" field.
func LanguageCodeLT(v string) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldLT(FieldLanguageCode, v))
}

// LanguageCodeLTE applies the LTE predicate on the "language_code" field.
func LanguageCodeLTE(v string) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldLTE(FieldLanguageCode, v))
}

// LanguageCodeContains applies the Contains predicate on the "language_code" field.
func LanguageCodeContains(v string) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldContains(FieldLanguageCode, v))
}

// LanguageCodeHasPrefix applies the HasPrefix predicate on the "language_code" field.
func LanguageCodeHasPrefix(v string) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldHasPrefix(FieldLanguageCode, v))
}

// LanguageCodeHasSuffix applies the HasSuffix predicate on the "language_code" field.
func LanguageCodeHasSuffix(v string) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldHasSuffix(FieldLanguageCode, v))
}

// LanguageCodeEqualFold applies the EqualFold predicate on the "language_code" field.
func LanguageCodeEqualFold(v string) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldEqualFold(FieldLanguageCode, v))
}

// LanguageCodeContainsFold applies the ContainsFold predicate on the "language_code" field.
func LanguageCodeContainsFold(v string) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldContainsFold(FieldLanguageCode, v))
}

// TitleEQ applies the EQ predicate on the "title" field.
func TitleEQ(v string) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldEQ(FieldTitle, v))
}

// TitleNEQ applies the NEQ predicate on the "title" field.
func TitleNEQ(v string) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldNEQ(FieldTitle, v))
}

// TitleIn applies the In predicate on the "title" field.
func TitleIn(vs ...string) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldIn(FieldTitle, vs...))
}

// TitleNotIn applies the NotIn predicate on the "title" field.
func TitleNotIn(vs ...string) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldNotIn(FieldTitle, vs...))
}

// TitleGT applies the GT predicate on the "title" field.
func TitleGT(v string) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldGT(FieldTitle, v))
}

// TitleGTE applies the GTE predicate on the "title" field.
func TitleGTE(v string) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldGTE(FieldTitle, v))
}

// TitleLT applies the LT predicate on the "title" field.
func TitleLT(v string) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldLT(FieldTitle, v))
}

// TitleLTE applies the LTE predicate on the "title" field.
func TitleLTE(v string) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldLTE(FieldTitle, v))
}

// TitleContains applies the Contains predicate on the "title" field.
func TitleContains(v string) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldContains(FieldTitle, v))
}

// TitleHasPrefix applies the HasPrefix predicate on the "title" field.
func TitleHasPrefix(v string) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldHasPrefix(FieldTitle, v))
}

// TitleHasSuffix applies the HasSuffix predicate on the "title" field.
func TitleHasSuffix(v string) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldHasSuffix(FieldTitle, v))
}

// TitleEqualFold applies the EqualFold predicate on the "title" field.
func TitleEqualFold(v string) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldEqualFold(FieldTitle, v))
}

// TitleContainsFold applies the ContainsFold predicate on the "title" field.
func TitleContainsFold(v string) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldContainsFold(FieldTitle, v))
}

// AwardingOrganizationEQ applies the EQ predicate on the "awarding_organization" field.
func AwardingOrganizationEQ(v string) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldEQ(FieldAwardingOrganization, v))
}

// AwardingOrganizationNEQ applies the NEQ predicate on the "awarding_organization" field.
func AwardingOrganizationNEQ(v string) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldNEQ(FieldAwardingOrganization, v))
}

// AwardingOrganizationIn applies the In predicate on the "awarding_organization" field.
func AwardingOrganizationIn(vs ...string) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldIn(FieldAwardingOrganization, vs...))
}

// AwardingOrganizationNotIn applies the NotIn predicate on the "awarding_organization" field.
func AwardingOrganizationNotIn(vs ...string) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldNotIn(FieldAwardingOrganization, vs...))
}

// AwardingOrganizationGT applies the GT predicate on the "awarding_organization" field.
func AwardingOrganizationGT(v string) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldGT(FieldAwardingOrganization, v))
}

// AwardingOrganizationGTE applies the GTE predicate on the "awarding_organization" field.
func AwardingOrganizationGTE(v string) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldGTE(FieldAwardingOrganization, v))
}

// AwardingOrganizationLT applies the LT predicate on the "awarding_organization" field.
func AwardingOrganizationLT(v string) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldLT(FieldAwardingOrganization, v))
}

// AwardingOrganizationLTE applies the LTE predicate on the "awarding_organization" field.
func AwardingOrganizationLTE(v string) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldLTE(FieldAwardingOrganization, v))
}

// AwardingOrganizationContains applies the Contains predicate on the "awarding_organization" field.
func AwardingOrganizationContains(v string) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldContains(FieldAwardingOrganization, v))
}

// AwardingOrganizationHasPrefix applies the HasPrefix predicate on the "awarding_organization" field.
func AwardingOrganizationHasPrefix(v string) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldHasPrefix(FieldAwardingOrganization, v))
}

// AwardingOrganizationHasSuffix applies the HasSuffix predicate on the "awarding_organization" field.
func AwardingOrganizationHasSuffix(v string) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldHasSuffix(FieldAwardingOrganization, v))
}

// AwardingOrganizationEqualFold applies the EqualFold predicate on the "awarding_organization" field.
func AwardingOrganizationEqualFold(v string) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldEqualFold(FieldAwardingOrganization, v))
}

// AwardingOrganizationContainsFold applies the ContainsFold predicate on the "awarding_organization" field.
func AwardingOrganizationContainsFold(v string) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldContainsFold(FieldAwardingOrganization, v))
}

// AwardTypeEQ applies the EQ predicate on the "award_type" field.
func AwardTypeEQ(v string) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldEQ(FieldAwardType, v))
}

// AwardTypeNEQ applies the NEQ predicate on the "award_type" field.
func AwardTypeNEQ(v string) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldNEQ(FieldAwardType, v))
}

// AwardTypeIn applies the In predicate on the "award_type" field.
func AwardTypeIn(vs ...string) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldIn(FieldAwardType, vs...))
}

// AwardTypeNotIn applies the NotIn predicate on the "award_type" field.
func AwardTypeNotIn(vs ...string) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldNotIn(FieldAwardType, vs...))
}

// AwardTypeGT applies the GT predicate on the "award_type" field.
func AwardTypeGT(v string) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldGT(FieldAwardType, v))
}

// AwardTypeGTE applies the GTE predicate on the "award_type" field.
func AwardTypeGTE(v string) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldGTE(FieldAwardType, v))
}

// AwardTypeLT applies the LT predicate on the "award_type" field.
func AwardTypeLT(v string) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldLT(FieldAwardType, v))
}

// AwardTypeLTE applies the LTE predicate on the "award_type" field.
func AwardTypeLTE(v string) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldLTE(FieldAwardType, v))
}

// AwardTypeContains applies the Contains predicate on the "award_type" field.
func AwardTypeContains(v string) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldContains(FieldAwardType, v))
}

// AwardTypeHasPrefix applies the HasPrefix predicate on the "award_type" field.
func AwardTypeHasPrefix(v string) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldHasPrefix(FieldAwardType, v))
}

// AwardTypeHasSuffix applies the HasSuffix predicate on the "award_type" field.
func AwardTypeHasSuffix(v string) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldHasSuffix(FieldAwardType, v))
}

// AwardTypeIsNil applies the IsNil predicate on the "award_type" field.
func AwardTypeIsNil() predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldIsNull(FieldAwardType))
}

// AwardTypeNotNil applies the NotNil predicate on the "award_type" field.
func AwardTypeNotNil() predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldNotNull(FieldAwardType))
}

// AwardTypeEqualFold applies the EqualFold predicate on the "award_type" field.
func AwardTypeEqualFold(v string) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldEqualFold(FieldAwardType, v))
}

// AwardTypeContainsFold applies the ContainsFold predicate on the "award_type" field.
func AwardTypeContainsFold(v string) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldContainsFold(FieldAwardType, v))
}

// DescriptionEQ applies the EQ predicate on the "description" field.
func DescriptionEQ(v string) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldEQ(FieldDescription, v))
}

// DescriptionNEQ applies the NEQ predicate on the "description" field.
func DescriptionNEQ(v string) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldNEQ(FieldDescription, v))
}

// DescriptionIn applies the In predicate on the "description" field.
func DescriptionIn(vs ...string) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldIn(FieldDescription, vs...))
}

// DescriptionNotIn applies the NotIn predicate on the "description" field.
func DescriptionNotIn(vs ...string) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldNotIn(FieldDescription, vs...))
}

// DescriptionGT applies the GT predicate on the "description" field.
func DescriptionGT(v string) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldGT(FieldDescription, v))
}

// DescriptionGTE applies the GTE predicate on the "description" field.
func DescriptionGTE(v string) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldGTE(FieldDescription, v))
}

// DescriptionLT applies the LT predicate on the "description" field.
func DescriptionLT(v string) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldLT(FieldDescription, v))
}

// DescriptionLTE applies the LTE predicate on the "description" field.
func DescriptionLTE(v string) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldLTE(FieldDescription, v))
}

// DescriptionContains applies the Contains predicate on the "description" field.
func DescriptionContains(v string) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldContains(FieldDescription, v))
}

// DescriptionHasPrefix applies the HasPrefix predicate on the "description" field.
func DescriptionHasPrefix(v string) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldHasPrefix(FieldDescription, v))
}

// DescriptionHasSuffix applies the HasSuffix predicate on the "description" field.
func DescriptionHasSuffix(v string) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldHasSuffix(FieldDescription, v))
}

// DescriptionIsNil applies the IsNil predicate on the "description" field.
func DescriptionIsNil() predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldIsNull(FieldDescription))
}

// DescriptionNotNil applies the NotNil predicate on the "description" field.
func DescriptionNotNil() predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldNotNull(FieldDescription))
}

// DescriptionEqualFold applies the EqualFold predicate on the "description" field.
func DescriptionEqualFold(v string) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldEqualFold(FieldDescription, v))
}

// DescriptionContainsFold applies the ContainsFold predicate on the "description" field.
func DescriptionContainsFold(v string) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldContainsFold(FieldDescription, v))
}

// CreatedAtEQ applies the EQ predicate on the "created_at" field.
func CreatedAtEQ(v time.Time) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldEQ(FieldCreatedAt, v))
}

// CreatedAtNEQ applies the NEQ predicate on the "created_at" field.
func CreatedAtNEQ(v time.Time) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldNEQ(FieldCreatedAt, v))
}

// CreatedAtIn applies the In predicate on the "created_at" field.
func CreatedAtIn(vs ...time.Time) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldIn(FieldCreatedAt, vs...))
}

// CreatedAtNotIn applies the NotIn predicate on the "created_at" field.
func CreatedAtNotIn(vs ...time.Time) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldNotIn(FieldCreatedAt, vs...))
}

// CreatedAtGT applies the GT predicate on the "created_at" field.
func CreatedAtGT(v time.Time) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldGT(FieldCreatedAt, v))
}

// CreatedAtGTE applies the GTE predicate on the "created_at" field.
func CreatedAtGTE(v time.Time) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldGTE(FieldCreatedAt, v))
}

// CreatedAtLT applies the LT predicate on the "created_at" field.
func CreatedAtLT(v time.Time) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldLT(FieldCreatedAt, v))
}

// CreatedAtLTE applies the LTE predicate on the "created_at" field.
func CreatedAtLTE(v time.Time) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.FieldLTE(FieldCreatedAt, v))
}

// HasAward applies the HasEdge predicate on the "award" edge.
func HasAward() predicate.AwardTranslation {
	return predicate.AwardTranslation(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, AwardTable, AwardColumn),
		)
		sqlgraph.HasNeighbors(s, step)
	})
}

// HasAwardWith applies the HasEdge predicate on the "award" edge with a given conditions (other predicates).
func HasAwardWith(preds ...predicate.Award) predicate.AwardTranslation {
	return predicate.AwardTranslation(func(s *sql.Selector) {
		step := newAwardStep()
		sqlgraph.HasNeighborsWith(s, step, func(s *sql.Selector) {
			for _, p := range preds {
				p(s)
			}
		})
	})
}

// HasLanguage applies the HasEdge predicate on the "language" edge.
func HasLanguage() predicate.AwardTranslation {
	return predicate.AwardTranslation(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, LanguageTable, LanguageColumn),
		)
		sqlgraph.HasNeighbors(s, step)
	})
}

// HasLanguageWith applies the HasEdge predicate on the "language" edge with a given conditions (other predicates).
func HasLanguageWith(preds ...predicate.Language) predicate.AwardTranslation {
	return predicate.AwardTranslation(func(s *sql.Selector) {
		step := newLanguageStep()
		sqlgraph.HasNeighborsWith(s, step, func(s *sql.Selector) {
			for _, p := range preds {
				p(s)
			}
		})
	})
}

// And groups predicates with the AND operator between them.
func And(predicates ...predicate.AwardTranslation) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.AndPredicates(predicates...))
}

// Or groups predicates with the OR operator between them.
func Or(predicates ...predicate.AwardTranslation) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.OrPredicates(predicates...))
}

// Not applies the not operator on the given predicate.
func Not(p predicate.AwardTranslation) predicate.AwardTranslation {
	return predicate.AwardTranslation(sql.NotPredicates(p))
}
