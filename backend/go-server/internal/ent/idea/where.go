// Code generated by ent, DO NOT EDIT.

package idea

import (
	"silan-backend/internal/ent/predicate"
	"time"

	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
	"github.com/google/uuid"
)

// ID filters vertices based on their ID field.
func ID(id uuid.UUID) predicate.Idea {
	return predicate.Idea(sql.FieldEQ(FieldID, id))
}

// IDEQ applies the EQ predicate on the ID field.
func IDEQ(id uuid.UUID) predicate.Idea {
	return predicate.Idea(sql.FieldEQ(FieldID, id))
}

// IDNEQ applies the NEQ predicate on the ID field.
func IDNEQ(id uuid.UUID) predicate.Idea {
	return predicate.Idea(sql.FieldNEQ(FieldID, id))
}

// IDIn applies the In predicate on the ID field.
func IDIn(ids ...uuid.UUID) predicate.Idea {
	return predicate.Idea(sql.FieldIn(FieldID, ids...))
}

// IDNotIn applies the NotIn predicate on the ID field.
func IDNotIn(ids ...uuid.UUID) predicate.Idea {
	return predicate.Idea(sql.FieldNotIn(FieldID, ids...))
}

// IDGT applies the GT predicate on the ID field.
func IDGT(id uuid.UUID) predicate.Idea {
	return predicate.Idea(sql.FieldGT(FieldID, id))
}

// IDGTE applies the GTE predicate on the ID field.
func IDGTE(id uuid.UUID) predicate.Idea {
	return predicate.Idea(sql.FieldGTE(FieldID, id))
}

// IDLT applies the LT predicate on the ID field.
func IDLT(id uuid.UUID) predicate.Idea {
	return predicate.Idea(sql.FieldLT(FieldID, id))
}

// IDLTE applies the LTE predicate on the ID field.
func IDLTE(id uuid.UUID) predicate.Idea {
	return predicate.Idea(sql.FieldLTE(FieldID, id))
}

// UserID applies equality check predicate on the "user_id" field. It's identical to UserIDEQ.
func UserID(v uuid.UUID) predicate.Idea {
	return predicate.Idea(sql.FieldEQ(FieldUserID, v))
}

// Title applies equality check predicate on the "title" field. It's identical to TitleEQ.
func Title(v string) predicate.Idea {
	return predicate.Idea(sql.FieldEQ(FieldTitle, v))
}

// Slug applies equality check predicate on the "slug" field. It's identical to SlugEQ.
func Slug(v string) predicate.Idea {
	return predicate.Idea(sql.FieldEQ(FieldSlug, v))
}

// Abstract applies equality check predicate on the "abstract" field. It's identical to AbstractEQ.
func Abstract(v string) predicate.Idea {
	return predicate.Idea(sql.FieldEQ(FieldAbstract, v))
}

// Motivation applies equality check predicate on the "motivation" field. It's identical to MotivationEQ.
func Motivation(v string) predicate.Idea {
	return predicate.Idea(sql.FieldEQ(FieldMotivation, v))
}

// Methodology applies equality check predicate on the "methodology" field. It's identical to MethodologyEQ.
func Methodology(v string) predicate.Idea {
	return predicate.Idea(sql.FieldEQ(FieldMethodology, v))
}

// ExpectedOutcome applies equality check predicate on the "expected_outcome" field. It's identical to ExpectedOutcomeEQ.
func ExpectedOutcome(v string) predicate.Idea {
	return predicate.Idea(sql.FieldEQ(FieldExpectedOutcome, v))
}

// EstimatedDurationMonths applies equality check predicate on the "estimated_duration_months" field. It's identical to EstimatedDurationMonthsEQ.
func EstimatedDurationMonths(v int) predicate.Idea {
	return predicate.Idea(sql.FieldEQ(FieldEstimatedDurationMonths, v))
}

// RequiredResources applies equality check predicate on the "required_resources" field. It's identical to RequiredResourcesEQ.
func RequiredResources(v string) predicate.Idea {
	return predicate.Idea(sql.FieldEQ(FieldRequiredResources, v))
}

// CollaborationNeeded applies equality check predicate on the "collaboration_needed" field. It's identical to CollaborationNeededEQ.
func CollaborationNeeded(v bool) predicate.Idea {
	return predicate.Idea(sql.FieldEQ(FieldCollaborationNeeded, v))
}

// FundingRequired applies equality check predicate on the "funding_required" field. It's identical to FundingRequiredEQ.
func FundingRequired(v bool) predicate.Idea {
	return predicate.Idea(sql.FieldEQ(FieldFundingRequired, v))
}

// EstimatedBudget applies equality check predicate on the "estimated_budget" field. It's identical to EstimatedBudgetEQ.
func EstimatedBudget(v float64) predicate.Idea {
	return predicate.Idea(sql.FieldEQ(FieldEstimatedBudget, v))
}

// IsPublic applies equality check predicate on the "is_public" field. It's identical to IsPublicEQ.
func IsPublic(v bool) predicate.Idea {
	return predicate.Idea(sql.FieldEQ(FieldIsPublic, v))
}

// ViewCount applies equality check predicate on the "view_count" field. It's identical to ViewCountEQ.
func ViewCount(v int) predicate.Idea {
	return predicate.Idea(sql.FieldEQ(FieldViewCount, v))
}

// LikeCount applies equality check predicate on the "like_count" field. It's identical to LikeCountEQ.
func LikeCount(v int) predicate.Idea {
	return predicate.Idea(sql.FieldEQ(FieldLikeCount, v))
}

// CreatedAt applies equality check predicate on the "created_at" field. It's identical to CreatedAtEQ.
func CreatedAt(v time.Time) predicate.Idea {
	return predicate.Idea(sql.FieldEQ(FieldCreatedAt, v))
}

// UpdatedAt applies equality check predicate on the "updated_at" field. It's identical to UpdatedAtEQ.
func UpdatedAt(v time.Time) predicate.Idea {
	return predicate.Idea(sql.FieldEQ(FieldUpdatedAt, v))
}

// UserIDEQ applies the EQ predicate on the "user_id" field.
func UserIDEQ(v uuid.UUID) predicate.Idea {
	return predicate.Idea(sql.FieldEQ(FieldUserID, v))
}

// UserIDNEQ applies the NEQ predicate on the "user_id" field.
func UserIDNEQ(v uuid.UUID) predicate.Idea {
	return predicate.Idea(sql.FieldNEQ(FieldUserID, v))
}

// UserIDIn applies the In predicate on the "user_id" field.
func UserIDIn(vs ...uuid.UUID) predicate.Idea {
	return predicate.Idea(sql.FieldIn(FieldUserID, vs...))
}

// UserIDNotIn applies the NotIn predicate on the "user_id" field.
func UserIDNotIn(vs ...uuid.UUID) predicate.Idea {
	return predicate.Idea(sql.FieldNotIn(FieldUserID, vs...))
}

// TitleEQ applies the EQ predicate on the "title" field.
func TitleEQ(v string) predicate.Idea {
	return predicate.Idea(sql.FieldEQ(FieldTitle, v))
}

// TitleNEQ applies the NEQ predicate on the "title" field.
func TitleNEQ(v string) predicate.Idea {
	return predicate.Idea(sql.FieldNEQ(FieldTitle, v))
}

// TitleIn applies the In predicate on the "title" field.
func TitleIn(vs ...string) predicate.Idea {
	return predicate.Idea(sql.FieldIn(FieldTitle, vs...))
}

// TitleNotIn applies the NotIn predicate on the "title" field.
func TitleNotIn(vs ...string) predicate.Idea {
	return predicate.Idea(sql.FieldNotIn(FieldTitle, vs...))
}

// TitleGT applies the GT predicate on the "title" field.
func TitleGT(v string) predicate.Idea {
	return predicate.Idea(sql.FieldGT(FieldTitle, v))
}

// TitleGTE applies the GTE predicate on the "title" field.
func TitleGTE(v string) predicate.Idea {
	return predicate.Idea(sql.FieldGTE(FieldTitle, v))
}

// TitleLT applies the LT predicate on the "title" field.
func TitleLT(v string) predicate.Idea {
	return predicate.Idea(sql.FieldLT(FieldTitle, v))
}

// TitleLTE applies the LTE predicate on the "title" field.
func TitleLTE(v string) predicate.Idea {
	return predicate.Idea(sql.FieldLTE(FieldTitle, v))
}

// TitleContains applies the Contains predicate on the "title" field.
func TitleContains(v string) predicate.Idea {
	return predicate.Idea(sql.FieldContains(FieldTitle, v))
}

// TitleHasPrefix applies the HasPrefix predicate on the "title" field.
func TitleHasPrefix(v string) predicate.Idea {
	return predicate.Idea(sql.FieldHasPrefix(FieldTitle, v))
}

// TitleHasSuffix applies the HasSuffix predicate on the "title" field.
func TitleHasSuffix(v string) predicate.Idea {
	return predicate.Idea(sql.FieldHasSuffix(FieldTitle, v))
}

// TitleEqualFold applies the EqualFold predicate on the "title" field.
func TitleEqualFold(v string) predicate.Idea {
	return predicate.Idea(sql.FieldEqualFold(FieldTitle, v))
}

// TitleContainsFold applies the ContainsFold predicate on the "title" field.
func TitleContainsFold(v string) predicate.Idea {
	return predicate.Idea(sql.FieldContainsFold(FieldTitle, v))
}

// SlugEQ applies the EQ predicate on the "slug" field.
func SlugEQ(v string) predicate.Idea {
	return predicate.Idea(sql.FieldEQ(FieldSlug, v))
}

// SlugNEQ applies the NEQ predicate on the "slug" field.
func SlugNEQ(v string) predicate.Idea {
	return predicate.Idea(sql.FieldNEQ(FieldSlug, v))
}

// SlugIn applies the In predicate on the "slug" field.
func SlugIn(vs ...string) predicate.Idea {
	return predicate.Idea(sql.FieldIn(FieldSlug, vs...))
}

// SlugNotIn applies the NotIn predicate on the "slug" field.
func SlugNotIn(vs ...string) predicate.Idea {
	return predicate.Idea(sql.FieldNotIn(FieldSlug, vs...))
}

// SlugGT applies the GT predicate on the "slug" field.
func SlugGT(v string) predicate.Idea {
	return predicate.Idea(sql.FieldGT(FieldSlug, v))
}

// SlugGTE applies the GTE predicate on the "slug" field.
func SlugGTE(v string) predicate.Idea {
	return predicate.Idea(sql.FieldGTE(FieldSlug, v))
}

// SlugLT applies the LT predicate on the "slug" field.
func SlugLT(v string) predicate.Idea {
	return predicate.Idea(sql.FieldLT(FieldSlug, v))
}

// SlugLTE applies the LTE predicate on the "slug" field.
func SlugLTE(v string) predicate.Idea {
	return predicate.Idea(sql.FieldLTE(FieldSlug, v))
}

// SlugContains applies the Contains predicate on the "slug" field.
func SlugContains(v string) predicate.Idea {
	return predicate.Idea(sql.FieldContains(FieldSlug, v))
}

// SlugHasPrefix applies the HasPrefix predicate on the "slug" field.
func SlugHasPrefix(v string) predicate.Idea {
	return predicate.Idea(sql.FieldHasPrefix(FieldSlug, v))
}

// SlugHasSuffix applies the HasSuffix predicate on the "slug" field.
func SlugHasSuffix(v string) predicate.Idea {
	return predicate.Idea(sql.FieldHasSuffix(FieldSlug, v))
}

// SlugEqualFold applies the EqualFold predicate on the "slug" field.
func SlugEqualFold(v string) predicate.Idea {
	return predicate.Idea(sql.FieldEqualFold(FieldSlug, v))
}

// SlugContainsFold applies the ContainsFold predicate on the "slug" field.
func SlugContainsFold(v string) predicate.Idea {
	return predicate.Idea(sql.FieldContainsFold(FieldSlug, v))
}

// AbstractEQ applies the EQ predicate on the "abstract" field.
func AbstractEQ(v string) predicate.Idea {
	return predicate.Idea(sql.FieldEQ(FieldAbstract, v))
}

// AbstractNEQ applies the NEQ predicate on the "abstract" field.
func AbstractNEQ(v string) predicate.Idea {
	return predicate.Idea(sql.FieldNEQ(FieldAbstract, v))
}

// AbstractIn applies the In predicate on the "abstract" field.
func AbstractIn(vs ...string) predicate.Idea {
	return predicate.Idea(sql.FieldIn(FieldAbstract, vs...))
}

// AbstractNotIn applies the NotIn predicate on the "abstract" field.
func AbstractNotIn(vs ...string) predicate.Idea {
	return predicate.Idea(sql.FieldNotIn(FieldAbstract, vs...))
}

// AbstractGT applies the GT predicate on the "abstract" field.
func AbstractGT(v string) predicate.Idea {
	return predicate.Idea(sql.FieldGT(FieldAbstract, v))
}

// AbstractGTE applies the GTE predicate on the "abstract" field.
func AbstractGTE(v string) predicate.Idea {
	return predicate.Idea(sql.FieldGTE(FieldAbstract, v))
}

// AbstractLT applies the LT predicate on the "abstract" field.
func AbstractLT(v string) predicate.Idea {
	return predicate.Idea(sql.FieldLT(FieldAbstract, v))
}

// AbstractLTE applies the LTE predicate on the "abstract" field.
func AbstractLTE(v string) predicate.Idea {
	return predicate.Idea(sql.FieldLTE(FieldAbstract, v))
}

// AbstractContains applies the Contains predicate on the "abstract" field.
func AbstractContains(v string) predicate.Idea {
	return predicate.Idea(sql.FieldContains(FieldAbstract, v))
}

// AbstractHasPrefix applies the HasPrefix predicate on the "abstract" field.
func AbstractHasPrefix(v string) predicate.Idea {
	return predicate.Idea(sql.FieldHasPrefix(FieldAbstract, v))
}

// AbstractHasSuffix applies the HasSuffix predicate on the "abstract" field.
func AbstractHasSuffix(v string) predicate.Idea {
	return predicate.Idea(sql.FieldHasSuffix(FieldAbstract, v))
}

// AbstractIsNil applies the IsNil predicate on the "abstract" field.
func AbstractIsNil() predicate.Idea {
	return predicate.Idea(sql.FieldIsNull(FieldAbstract))
}

// AbstractNotNil applies the NotNil predicate on the "abstract" field.
func AbstractNotNil() predicate.Idea {
	return predicate.Idea(sql.FieldNotNull(FieldAbstract))
}

// AbstractEqualFold applies the EqualFold predicate on the "abstract" field.
func AbstractEqualFold(v string) predicate.Idea {
	return predicate.Idea(sql.FieldEqualFold(FieldAbstract, v))
}

// AbstractContainsFold applies the ContainsFold predicate on the "abstract" field.
func AbstractContainsFold(v string) predicate.Idea {
	return predicate.Idea(sql.FieldContainsFold(FieldAbstract, v))
}

// MotivationEQ applies the EQ predicate on the "motivation" field.
func MotivationEQ(v string) predicate.Idea {
	return predicate.Idea(sql.FieldEQ(FieldMotivation, v))
}

// MotivationNEQ applies the NEQ predicate on the "motivation" field.
func MotivationNEQ(v string) predicate.Idea {
	return predicate.Idea(sql.FieldNEQ(FieldMotivation, v))
}

// MotivationIn applies the In predicate on the "motivation" field.
func MotivationIn(vs ...string) predicate.Idea {
	return predicate.Idea(sql.FieldIn(FieldMotivation, vs...))
}

// MotivationNotIn applies the NotIn predicate on the "motivation" field.
func MotivationNotIn(vs ...string) predicate.Idea {
	return predicate.Idea(sql.FieldNotIn(FieldMotivation, vs...))
}

// MotivationGT applies the GT predicate on the "motivation" field.
func MotivationGT(v string) predicate.Idea {
	return predicate.Idea(sql.FieldGT(FieldMotivation, v))
}

// MotivationGTE applies the GTE predicate on the "motivation" field.
func MotivationGTE(v string) predicate.Idea {
	return predicate.Idea(sql.FieldGTE(FieldMotivation, v))
}

// MotivationLT applies the LT predicate on the "motivation" field.
func MotivationLT(v string) predicate.Idea {
	return predicate.Idea(sql.FieldLT(FieldMotivation, v))
}

// MotivationLTE applies the LTE predicate on the "motivation" field.
func MotivationLTE(v string) predicate.Idea {
	return predicate.Idea(sql.FieldLTE(FieldMotivation, v))
}

// MotivationContains applies the Contains predicate on the "motivation" field.
func MotivationContains(v string) predicate.Idea {
	return predicate.Idea(sql.FieldContains(FieldMotivation, v))
}

// MotivationHasPrefix applies the HasPrefix predicate on the "motivation" field.
func MotivationHasPrefix(v string) predicate.Idea {
	return predicate.Idea(sql.FieldHasPrefix(FieldMotivation, v))
}

// MotivationHasSuffix applies the HasSuffix predicate on the "motivation" field.
func MotivationHasSuffix(v string) predicate.Idea {
	return predicate.Idea(sql.FieldHasSuffix(FieldMotivation, v))
}

// MotivationIsNil applies the IsNil predicate on the "motivation" field.
func MotivationIsNil() predicate.Idea {
	return predicate.Idea(sql.FieldIsNull(FieldMotivation))
}

// MotivationNotNil applies the NotNil predicate on the "motivation" field.
func MotivationNotNil() predicate.Idea {
	return predicate.Idea(sql.FieldNotNull(FieldMotivation))
}

// MotivationEqualFold applies the EqualFold predicate on the "motivation" field.
func MotivationEqualFold(v string) predicate.Idea {
	return predicate.Idea(sql.FieldEqualFold(FieldMotivation, v))
}

// MotivationContainsFold applies the ContainsFold predicate on the "motivation" field.
func MotivationContainsFold(v string) predicate.Idea {
	return predicate.Idea(sql.FieldContainsFold(FieldMotivation, v))
}

// MethodologyEQ applies the EQ predicate on the "methodology" field.
func MethodologyEQ(v string) predicate.Idea {
	return predicate.Idea(sql.FieldEQ(FieldMethodology, v))
}

// MethodologyNEQ applies the NEQ predicate on the "methodology" field.
func MethodologyNEQ(v string) predicate.Idea {
	return predicate.Idea(sql.FieldNEQ(FieldMethodology, v))
}

// MethodologyIn applies the In predicate on the "methodology" field.
func MethodologyIn(vs ...string) predicate.Idea {
	return predicate.Idea(sql.FieldIn(FieldMethodology, vs...))
}

// MethodologyNotIn applies the NotIn predicate on the "methodology" field.
func MethodologyNotIn(vs ...string) predicate.Idea {
	return predicate.Idea(sql.FieldNotIn(FieldMethodology, vs...))
}

// MethodologyGT applies the GT predicate on the "methodology" field.
func MethodologyGT(v string) predicate.Idea {
	return predicate.Idea(sql.FieldGT(FieldMethodology, v))
}

// MethodologyGTE applies the GTE predicate on the "methodology" field.
func MethodologyGTE(v string) predicate.Idea {
	return predicate.Idea(sql.FieldGTE(FieldMethodology, v))
}

// MethodologyLT applies the LT predicate on the "methodology" field.
func MethodologyLT(v string) predicate.Idea {
	return predicate.Idea(sql.FieldLT(FieldMethodology, v))
}

// MethodologyLTE applies the LTE predicate on the "methodology" field.
func MethodologyLTE(v string) predicate.Idea {
	return predicate.Idea(sql.FieldLTE(FieldMethodology, v))
}

// MethodologyContains applies the Contains predicate on the "methodology" field.
func MethodologyContains(v string) predicate.Idea {
	return predicate.Idea(sql.FieldContains(FieldMethodology, v))
}

// MethodologyHasPrefix applies the HasPrefix predicate on the "methodology" field.
func MethodologyHasPrefix(v string) predicate.Idea {
	return predicate.Idea(sql.FieldHasPrefix(FieldMethodology, v))
}

// MethodologyHasSuffix applies the HasSuffix predicate on the "methodology" field.
func MethodologyHasSuffix(v string) predicate.Idea {
	return predicate.Idea(sql.FieldHasSuffix(FieldMethodology, v))
}

// MethodologyIsNil applies the IsNil predicate on the "methodology" field.
func MethodologyIsNil() predicate.Idea {
	return predicate.Idea(sql.FieldIsNull(FieldMethodology))
}

// MethodologyNotNil applies the NotNil predicate on the "methodology" field.
func MethodologyNotNil() predicate.Idea {
	return predicate.Idea(sql.FieldNotNull(FieldMethodology))
}

// MethodologyEqualFold applies the EqualFold predicate on the "methodology" field.
func MethodologyEqualFold(v string) predicate.Idea {
	return predicate.Idea(sql.FieldEqualFold(FieldMethodology, v))
}

// MethodologyContainsFold applies the ContainsFold predicate on the "methodology" field.
func MethodologyContainsFold(v string) predicate.Idea {
	return predicate.Idea(sql.FieldContainsFold(FieldMethodology, v))
}

// ExpectedOutcomeEQ applies the EQ predicate on the "expected_outcome" field.
func ExpectedOutcomeEQ(v string) predicate.Idea {
	return predicate.Idea(sql.FieldEQ(FieldExpectedOutcome, v))
}

// ExpectedOutcomeNEQ applies the NEQ predicate on the "expected_outcome" field.
func ExpectedOutcomeNEQ(v string) predicate.Idea {
	return predicate.Idea(sql.FieldNEQ(FieldExpectedOutcome, v))
}

// ExpectedOutcomeIn applies the In predicate on the "expected_outcome" field.
func ExpectedOutcomeIn(vs ...string) predicate.Idea {
	return predicate.Idea(sql.FieldIn(FieldExpectedOutcome, vs...))
}

// ExpectedOutcomeNotIn applies the NotIn predicate on the "expected_outcome" field.
func ExpectedOutcomeNotIn(vs ...string) predicate.Idea {
	return predicate.Idea(sql.FieldNotIn(FieldExpectedOutcome, vs...))
}

// ExpectedOutcomeGT applies the GT predicate on the "expected_outcome" field.
func ExpectedOutcomeGT(v string) predicate.Idea {
	return predicate.Idea(sql.FieldGT(FieldExpectedOutcome, v))
}

// ExpectedOutcomeGTE applies the GTE predicate on the "expected_outcome" field.
func ExpectedOutcomeGTE(v string) predicate.Idea {
	return predicate.Idea(sql.FieldGTE(FieldExpectedOutcome, v))
}

// ExpectedOutcomeLT applies the LT predicate on the "expected_outcome" field.
func ExpectedOutcomeLT(v string) predicate.Idea {
	return predicate.Idea(sql.FieldLT(FieldExpectedOutcome, v))
}

// ExpectedOutcomeLTE applies the LTE predicate on the "expected_outcome" field.
func ExpectedOutcomeLTE(v string) predicate.Idea {
	return predicate.Idea(sql.FieldLTE(FieldExpectedOutcome, v))
}

// ExpectedOutcomeContains applies the Contains predicate on the "expected_outcome" field.
func ExpectedOutcomeContains(v string) predicate.Idea {
	return predicate.Idea(sql.FieldContains(FieldExpectedOutcome, v))
}

// ExpectedOutcomeHasPrefix applies the HasPrefix predicate on the "expected_outcome" field.
func ExpectedOutcomeHasPrefix(v string) predicate.Idea {
	return predicate.Idea(sql.FieldHasPrefix(FieldExpectedOutcome, v))
}

// ExpectedOutcomeHasSuffix applies the HasSuffix predicate on the "expected_outcome" field.
func ExpectedOutcomeHasSuffix(v string) predicate.Idea {
	return predicate.Idea(sql.FieldHasSuffix(FieldExpectedOutcome, v))
}

// ExpectedOutcomeIsNil applies the IsNil predicate on the "expected_outcome" field.
func ExpectedOutcomeIsNil() predicate.Idea {
	return predicate.Idea(sql.FieldIsNull(FieldExpectedOutcome))
}

// ExpectedOutcomeNotNil applies the NotNil predicate on the "expected_outcome" field.
func ExpectedOutcomeNotNil() predicate.Idea {
	return predicate.Idea(sql.FieldNotNull(FieldExpectedOutcome))
}

// ExpectedOutcomeEqualFold applies the EqualFold predicate on the "expected_outcome" field.
func ExpectedOutcomeEqualFold(v string) predicate.Idea {
	return predicate.Idea(sql.FieldEqualFold(FieldExpectedOutcome, v))
}

// ExpectedOutcomeContainsFold applies the ContainsFold predicate on the "expected_outcome" field.
func ExpectedOutcomeContainsFold(v string) predicate.Idea {
	return predicate.Idea(sql.FieldContainsFold(FieldExpectedOutcome, v))
}

// StatusEQ applies the EQ predicate on the "status" field.
func StatusEQ(v Status) predicate.Idea {
	return predicate.Idea(sql.FieldEQ(FieldStatus, v))
}

// StatusNEQ applies the NEQ predicate on the "status" field.
func StatusNEQ(v Status) predicate.Idea {
	return predicate.Idea(sql.FieldNEQ(FieldStatus, v))
}

// StatusIn applies the In predicate on the "status" field.
func StatusIn(vs ...Status) predicate.Idea {
	return predicate.Idea(sql.FieldIn(FieldStatus, vs...))
}

// StatusNotIn applies the NotIn predicate on the "status" field.
func StatusNotIn(vs ...Status) predicate.Idea {
	return predicate.Idea(sql.FieldNotIn(FieldStatus, vs...))
}

// PriorityEQ applies the EQ predicate on the "priority" field.
func PriorityEQ(v Priority) predicate.Idea {
	return predicate.Idea(sql.FieldEQ(FieldPriority, v))
}

// PriorityNEQ applies the NEQ predicate on the "priority" field.
func PriorityNEQ(v Priority) predicate.Idea {
	return predicate.Idea(sql.FieldNEQ(FieldPriority, v))
}

// PriorityIn applies the In predicate on the "priority" field.
func PriorityIn(vs ...Priority) predicate.Idea {
	return predicate.Idea(sql.FieldIn(FieldPriority, vs...))
}

// PriorityNotIn applies the NotIn predicate on the "priority" field.
func PriorityNotIn(vs ...Priority) predicate.Idea {
	return predicate.Idea(sql.FieldNotIn(FieldPriority, vs...))
}

// EstimatedDurationMonthsEQ applies the EQ predicate on the "estimated_duration_months" field.
func EstimatedDurationMonthsEQ(v int) predicate.Idea {
	return predicate.Idea(sql.FieldEQ(FieldEstimatedDurationMonths, v))
}

// EstimatedDurationMonthsNEQ applies the NEQ predicate on the "estimated_duration_months" field.
func EstimatedDurationMonthsNEQ(v int) predicate.Idea {
	return predicate.Idea(sql.FieldNEQ(FieldEstimatedDurationMonths, v))
}

// EstimatedDurationMonthsIn applies the In predicate on the "estimated_duration_months" field.
func EstimatedDurationMonthsIn(vs ...int) predicate.Idea {
	return predicate.Idea(sql.FieldIn(FieldEstimatedDurationMonths, vs...))
}

// EstimatedDurationMonthsNotIn applies the NotIn predicate on the "estimated_duration_months" field.
func EstimatedDurationMonthsNotIn(vs ...int) predicate.Idea {
	return predicate.Idea(sql.FieldNotIn(FieldEstimatedDurationMonths, vs...))
}

// EstimatedDurationMonthsGT applies the GT predicate on the "estimated_duration_months" field.
func EstimatedDurationMonthsGT(v int) predicate.Idea {
	return predicate.Idea(sql.FieldGT(FieldEstimatedDurationMonths, v))
}

// EstimatedDurationMonthsGTE applies the GTE predicate on the "estimated_duration_months" field.
func EstimatedDurationMonthsGTE(v int) predicate.Idea {
	return predicate.Idea(sql.FieldGTE(FieldEstimatedDurationMonths, v))
}

// EstimatedDurationMonthsLT applies the LT predicate on the "estimated_duration_months" field.
func EstimatedDurationMonthsLT(v int) predicate.Idea {
	return predicate.Idea(sql.FieldLT(FieldEstimatedDurationMonths, v))
}

// EstimatedDurationMonthsLTE applies the LTE predicate on the "estimated_duration_months" field.
func EstimatedDurationMonthsLTE(v int) predicate.Idea {
	return predicate.Idea(sql.FieldLTE(FieldEstimatedDurationMonths, v))
}

// EstimatedDurationMonthsIsNil applies the IsNil predicate on the "estimated_duration_months" field.
func EstimatedDurationMonthsIsNil() predicate.Idea {
	return predicate.Idea(sql.FieldIsNull(FieldEstimatedDurationMonths))
}

// EstimatedDurationMonthsNotNil applies the NotNil predicate on the "estimated_duration_months" field.
func EstimatedDurationMonthsNotNil() predicate.Idea {
	return predicate.Idea(sql.FieldNotNull(FieldEstimatedDurationMonths))
}

// RequiredResourcesEQ applies the EQ predicate on the "required_resources" field.
func RequiredResourcesEQ(v string) predicate.Idea {
	return predicate.Idea(sql.FieldEQ(FieldRequiredResources, v))
}

// RequiredResourcesNEQ applies the NEQ predicate on the "required_resources" field.
func RequiredResourcesNEQ(v string) predicate.Idea {
	return predicate.Idea(sql.FieldNEQ(FieldRequiredResources, v))
}

// RequiredResourcesIn applies the In predicate on the "required_resources" field.
func RequiredResourcesIn(vs ...string) predicate.Idea {
	return predicate.Idea(sql.FieldIn(FieldRequiredResources, vs...))
}

// RequiredResourcesNotIn applies the NotIn predicate on the "required_resources" field.
func RequiredResourcesNotIn(vs ...string) predicate.Idea {
	return predicate.Idea(sql.FieldNotIn(FieldRequiredResources, vs...))
}

// RequiredResourcesGT applies the GT predicate on the "required_resources" field.
func RequiredResourcesGT(v string) predicate.Idea {
	return predicate.Idea(sql.FieldGT(FieldRequiredResources, v))
}

// RequiredResourcesGTE applies the GTE predicate on the "required_resources" field.
func RequiredResourcesGTE(v string) predicate.Idea {
	return predicate.Idea(sql.FieldGTE(FieldRequiredResources, v))
}

// RequiredResourcesLT applies the LT predicate on the "required_resources" field.
func RequiredResourcesLT(v string) predicate.Idea {
	return predicate.Idea(sql.FieldLT(FieldRequiredResources, v))
}

// RequiredResourcesLTE applies the LTE predicate on the "required_resources" field.
func RequiredResourcesLTE(v string) predicate.Idea {
	return predicate.Idea(sql.FieldLTE(FieldRequiredResources, v))
}

// RequiredResourcesContains applies the Contains predicate on the "required_resources" field.
func RequiredResourcesContains(v string) predicate.Idea {
	return predicate.Idea(sql.FieldContains(FieldRequiredResources, v))
}

// RequiredResourcesHasPrefix applies the HasPrefix predicate on the "required_resources" field.
func RequiredResourcesHasPrefix(v string) predicate.Idea {
	return predicate.Idea(sql.FieldHasPrefix(FieldRequiredResources, v))
}

// RequiredResourcesHasSuffix applies the HasSuffix predicate on the "required_resources" field.
func RequiredResourcesHasSuffix(v string) predicate.Idea {
	return predicate.Idea(sql.FieldHasSuffix(FieldRequiredResources, v))
}

// RequiredResourcesIsNil applies the IsNil predicate on the "required_resources" field.
func RequiredResourcesIsNil() predicate.Idea {
	return predicate.Idea(sql.FieldIsNull(FieldRequiredResources))
}

// RequiredResourcesNotNil applies the NotNil predicate on the "required_resources" field.
func RequiredResourcesNotNil() predicate.Idea {
	return predicate.Idea(sql.FieldNotNull(FieldRequiredResources))
}

// RequiredResourcesEqualFold applies the EqualFold predicate on the "required_resources" field.
func RequiredResourcesEqualFold(v string) predicate.Idea {
	return predicate.Idea(sql.FieldEqualFold(FieldRequiredResources, v))
}

// RequiredResourcesContainsFold applies the ContainsFold predicate on the "required_resources" field.
func RequiredResourcesContainsFold(v string) predicate.Idea {
	return predicate.Idea(sql.FieldContainsFold(FieldRequiredResources, v))
}

// CollaborationNeededEQ applies the EQ predicate on the "collaboration_needed" field.
func CollaborationNeededEQ(v bool) predicate.Idea {
	return predicate.Idea(sql.FieldEQ(FieldCollaborationNeeded, v))
}

// CollaborationNeededNEQ applies the NEQ predicate on the "collaboration_needed" field.
func CollaborationNeededNEQ(v bool) predicate.Idea {
	return predicate.Idea(sql.FieldNEQ(FieldCollaborationNeeded, v))
}

// FundingRequiredEQ applies the EQ predicate on the "funding_required" field.
func FundingRequiredEQ(v bool) predicate.Idea {
	return predicate.Idea(sql.FieldEQ(FieldFundingRequired, v))
}

// FundingRequiredNEQ applies the NEQ predicate on the "funding_required" field.
func FundingRequiredNEQ(v bool) predicate.Idea {
	return predicate.Idea(sql.FieldNEQ(FieldFundingRequired, v))
}

// EstimatedBudgetEQ applies the EQ predicate on the "estimated_budget" field.
func EstimatedBudgetEQ(v float64) predicate.Idea {
	return predicate.Idea(sql.FieldEQ(FieldEstimatedBudget, v))
}

// EstimatedBudgetNEQ applies the NEQ predicate on the "estimated_budget" field.
func EstimatedBudgetNEQ(v float64) predicate.Idea {
	return predicate.Idea(sql.FieldNEQ(FieldEstimatedBudget, v))
}

// EstimatedBudgetIn applies the In predicate on the "estimated_budget" field.
func EstimatedBudgetIn(vs ...float64) predicate.Idea {
	return predicate.Idea(sql.FieldIn(FieldEstimatedBudget, vs...))
}

// EstimatedBudgetNotIn applies the NotIn predicate on the "estimated_budget" field.
func EstimatedBudgetNotIn(vs ...float64) predicate.Idea {
	return predicate.Idea(sql.FieldNotIn(FieldEstimatedBudget, vs...))
}

// EstimatedBudgetGT applies the GT predicate on the "estimated_budget" field.
func EstimatedBudgetGT(v float64) predicate.Idea {
	return predicate.Idea(sql.FieldGT(FieldEstimatedBudget, v))
}

// EstimatedBudgetGTE applies the GTE predicate on the "estimated_budget" field.
func EstimatedBudgetGTE(v float64) predicate.Idea {
	return predicate.Idea(sql.FieldGTE(FieldEstimatedBudget, v))
}

// EstimatedBudgetLT applies the LT predicate on the "estimated_budget" field.
func EstimatedBudgetLT(v float64) predicate.Idea {
	return predicate.Idea(sql.FieldLT(FieldEstimatedBudget, v))
}

// EstimatedBudgetLTE applies the LTE predicate on the "estimated_budget" field.
func EstimatedBudgetLTE(v float64) predicate.Idea {
	return predicate.Idea(sql.FieldLTE(FieldEstimatedBudget, v))
}

// EstimatedBudgetIsNil applies the IsNil predicate on the "estimated_budget" field.
func EstimatedBudgetIsNil() predicate.Idea {
	return predicate.Idea(sql.FieldIsNull(FieldEstimatedBudget))
}

// EstimatedBudgetNotNil applies the NotNil predicate on the "estimated_budget" field.
func EstimatedBudgetNotNil() predicate.Idea {
	return predicate.Idea(sql.FieldNotNull(FieldEstimatedBudget))
}

// IsPublicEQ applies the EQ predicate on the "is_public" field.
func IsPublicEQ(v bool) predicate.Idea {
	return predicate.Idea(sql.FieldEQ(FieldIsPublic, v))
}

// IsPublicNEQ applies the NEQ predicate on the "is_public" field.
func IsPublicNEQ(v bool) predicate.Idea {
	return predicate.Idea(sql.FieldNEQ(FieldIsPublic, v))
}

// ViewCountEQ applies the EQ predicate on the "view_count" field.
func ViewCountEQ(v int) predicate.Idea {
	return predicate.Idea(sql.FieldEQ(FieldViewCount, v))
}

// ViewCountNEQ applies the NEQ predicate on the "view_count" field.
func ViewCountNEQ(v int) predicate.Idea {
	return predicate.Idea(sql.FieldNEQ(FieldViewCount, v))
}

// ViewCountIn applies the In predicate on the "view_count" field.
func ViewCountIn(vs ...int) predicate.Idea {
	return predicate.Idea(sql.FieldIn(FieldViewCount, vs...))
}

// ViewCountNotIn applies the NotIn predicate on the "view_count" field.
func ViewCountNotIn(vs ...int) predicate.Idea {
	return predicate.Idea(sql.FieldNotIn(FieldViewCount, vs...))
}

// ViewCountGT applies the GT predicate on the "view_count" field.
func ViewCountGT(v int) predicate.Idea {
	return predicate.Idea(sql.FieldGT(FieldViewCount, v))
}

// ViewCountGTE applies the GTE predicate on the "view_count" field.
func ViewCountGTE(v int) predicate.Idea {
	return predicate.Idea(sql.FieldGTE(FieldViewCount, v))
}

// ViewCountLT applies the LT predicate on the "view_count" field.
func ViewCountLT(v int) predicate.Idea {
	return predicate.Idea(sql.FieldLT(FieldViewCount, v))
}

// ViewCountLTE applies the LTE predicate on the "view_count" field.
func ViewCountLTE(v int) predicate.Idea {
	return predicate.Idea(sql.FieldLTE(FieldViewCount, v))
}

// LikeCountEQ applies the EQ predicate on the "like_count" field.
func LikeCountEQ(v int) predicate.Idea {
	return predicate.Idea(sql.FieldEQ(FieldLikeCount, v))
}

// LikeCountNEQ applies the NEQ predicate on the "like_count" field.
func LikeCountNEQ(v int) predicate.Idea {
	return predicate.Idea(sql.FieldNEQ(FieldLikeCount, v))
}

// LikeCountIn applies the In predicate on the "like_count" field.
func LikeCountIn(vs ...int) predicate.Idea {
	return predicate.Idea(sql.FieldIn(FieldLikeCount, vs...))
}

// LikeCountNotIn applies the NotIn predicate on the "like_count" field.
func LikeCountNotIn(vs ...int) predicate.Idea {
	return predicate.Idea(sql.FieldNotIn(FieldLikeCount, vs...))
}

// LikeCountGT applies the GT predicate on the "like_count" field.
func LikeCountGT(v int) predicate.Idea {
	return predicate.Idea(sql.FieldGT(FieldLikeCount, v))
}

// LikeCountGTE applies the GTE predicate on the "like_count" field.
func LikeCountGTE(v int) predicate.Idea {
	return predicate.Idea(sql.FieldGTE(FieldLikeCount, v))
}

// LikeCountLT applies the LT predicate on the "like_count" field.
func LikeCountLT(v int) predicate.Idea {
	return predicate.Idea(sql.FieldLT(FieldLikeCount, v))
}

// LikeCountLTE applies the LTE predicate on the "like_count" field.
func LikeCountLTE(v int) predicate.Idea {
	return predicate.Idea(sql.FieldLTE(FieldLikeCount, v))
}

// CreatedAtEQ applies the EQ predicate on the "created_at" field.
func CreatedAtEQ(v time.Time) predicate.Idea {
	return predicate.Idea(sql.FieldEQ(FieldCreatedAt, v))
}

// CreatedAtNEQ applies the NEQ predicate on the "created_at" field.
func CreatedAtNEQ(v time.Time) predicate.Idea {
	return predicate.Idea(sql.FieldNEQ(FieldCreatedAt, v))
}

// CreatedAtIn applies the In predicate on the "created_at" field.
func CreatedAtIn(vs ...time.Time) predicate.Idea {
	return predicate.Idea(sql.FieldIn(FieldCreatedAt, vs...))
}

// CreatedAtNotIn applies the NotIn predicate on the "created_at" field.
func CreatedAtNotIn(vs ...time.Time) predicate.Idea {
	return predicate.Idea(sql.FieldNotIn(FieldCreatedAt, vs...))
}

// CreatedAtGT applies the GT predicate on the "created_at" field.
func CreatedAtGT(v time.Time) predicate.Idea {
	return predicate.Idea(sql.FieldGT(FieldCreatedAt, v))
}

// CreatedAtGTE applies the GTE predicate on the "created_at" field.
func CreatedAtGTE(v time.Time) predicate.Idea {
	return predicate.Idea(sql.FieldGTE(FieldCreatedAt, v))
}

// CreatedAtLT applies the LT predicate on the "created_at" field.
func CreatedAtLT(v time.Time) predicate.Idea {
	return predicate.Idea(sql.FieldLT(FieldCreatedAt, v))
}

// CreatedAtLTE applies the LTE predicate on the "created_at" field.
func CreatedAtLTE(v time.Time) predicate.Idea {
	return predicate.Idea(sql.FieldLTE(FieldCreatedAt, v))
}

// UpdatedAtEQ applies the EQ predicate on the "updated_at" field.
func UpdatedAtEQ(v time.Time) predicate.Idea {
	return predicate.Idea(sql.FieldEQ(FieldUpdatedAt, v))
}

// UpdatedAtNEQ applies the NEQ predicate on the "updated_at" field.
func UpdatedAtNEQ(v time.Time) predicate.Idea {
	return predicate.Idea(sql.FieldNEQ(FieldUpdatedAt, v))
}

// UpdatedAtIn applies the In predicate on the "updated_at" field.
func UpdatedAtIn(vs ...time.Time) predicate.Idea {
	return predicate.Idea(sql.FieldIn(FieldUpdatedAt, vs...))
}

// UpdatedAtNotIn applies the NotIn predicate on the "updated_at" field.
func UpdatedAtNotIn(vs ...time.Time) predicate.Idea {
	return predicate.Idea(sql.FieldNotIn(FieldUpdatedAt, vs...))
}

// UpdatedAtGT applies the GT predicate on the "updated_at" field.
func UpdatedAtGT(v time.Time) predicate.Idea {
	return predicate.Idea(sql.FieldGT(FieldUpdatedAt, v))
}

// UpdatedAtGTE applies the GTE predicate on the "updated_at" field.
func UpdatedAtGTE(v time.Time) predicate.Idea {
	return predicate.Idea(sql.FieldGTE(FieldUpdatedAt, v))
}

// UpdatedAtLT applies the LT predicate on the "updated_at" field.
func UpdatedAtLT(v time.Time) predicate.Idea {
	return predicate.Idea(sql.FieldLT(FieldUpdatedAt, v))
}

// UpdatedAtLTE applies the LTE predicate on the "updated_at" field.
func UpdatedAtLTE(v time.Time) predicate.Idea {
	return predicate.Idea(sql.FieldLTE(FieldUpdatedAt, v))
}

// HasUser applies the HasEdge predicate on the "user" edge.
func HasUser() predicate.Idea {
	return predicate.Idea(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, UserTable, UserColumn),
		)
		sqlgraph.HasNeighbors(s, step)
	})
}

// HasUserWith applies the HasEdge predicate on the "user" edge with a given conditions (other predicates).
func HasUserWith(preds ...predicate.User) predicate.Idea {
	return predicate.Idea(func(s *sql.Selector) {
		step := newUserStep()
		sqlgraph.HasNeighborsWith(s, step, func(s *sql.Selector) {
			for _, p := range preds {
				p(s)
			}
		})
	})
}

// HasTranslations applies the HasEdge predicate on the "translations" edge.
func HasTranslations() predicate.Idea {
	return predicate.Idea(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.Edge(sqlgraph.O2M, false, TranslationsTable, TranslationsColumn),
		)
		sqlgraph.HasNeighbors(s, step)
	})
}

// HasTranslationsWith applies the HasEdge predicate on the "translations" edge with a given conditions (other predicates).
func HasTranslationsWith(preds ...predicate.IdeaTranslation) predicate.Idea {
	return predicate.Idea(func(s *sql.Selector) {
		step := newTranslationsStep()
		sqlgraph.HasNeighborsWith(s, step, func(s *sql.Selector) {
			for _, p := range preds {
				p(s)
			}
		})
	})
}

// HasBlogPosts applies the HasEdge predicate on the "blog_posts" edge.
func HasBlogPosts() predicate.Idea {
	return predicate.Idea(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.Edge(sqlgraph.O2M, false, BlogPostsTable, BlogPostsColumn),
		)
		sqlgraph.HasNeighbors(s, step)
	})
}

// HasBlogPostsWith applies the HasEdge predicate on the "blog_posts" edge with a given conditions (other predicates).
func HasBlogPostsWith(preds ...predicate.BlogPost) predicate.Idea {
	return predicate.Idea(func(s *sql.Selector) {
		step := newBlogPostsStep()
		sqlgraph.HasNeighborsWith(s, step, func(s *sql.Selector) {
			for _, p := range preds {
				p(s)
			}
		})
	})
}

// And groups predicates with the AND operator between them.
func And(predicates ...predicate.Idea) predicate.Idea {
	return predicate.Idea(sql.AndPredicates(predicates...))
}

// Or groups predicates with the OR operator between them.
func Or(predicates ...predicate.Idea) predicate.Idea {
	return predicate.Idea(sql.OrPredicates(predicates...))
}

// Not applies the not operator on the given predicate.
func Not(p predicate.Idea) predicate.Idea {
	return predicate.Idea(sql.NotPredicates(p))
}
