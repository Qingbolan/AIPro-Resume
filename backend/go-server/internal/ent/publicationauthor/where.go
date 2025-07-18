// Code generated by ent, DO NOT EDIT.

package publicationauthor

import (
	"silan-backend/internal/ent/predicate"
	"time"

	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
	"github.com/google/uuid"
)

// ID filters vertices based on their ID field.
func ID(id uuid.UUID) predicate.PublicationAuthor {
	return predicate.PublicationAuthor(sql.FieldEQ(FieldID, id))
}

// IDEQ applies the EQ predicate on the ID field.
func IDEQ(id uuid.UUID) predicate.PublicationAuthor {
	return predicate.PublicationAuthor(sql.FieldEQ(FieldID, id))
}

// IDNEQ applies the NEQ predicate on the ID field.
func IDNEQ(id uuid.UUID) predicate.PublicationAuthor {
	return predicate.PublicationAuthor(sql.FieldNEQ(FieldID, id))
}

// IDIn applies the In predicate on the ID field.
func IDIn(ids ...uuid.UUID) predicate.PublicationAuthor {
	return predicate.PublicationAuthor(sql.FieldIn(FieldID, ids...))
}

// IDNotIn applies the NotIn predicate on the ID field.
func IDNotIn(ids ...uuid.UUID) predicate.PublicationAuthor {
	return predicate.PublicationAuthor(sql.FieldNotIn(FieldID, ids...))
}

// IDGT applies the GT predicate on the ID field.
func IDGT(id uuid.UUID) predicate.PublicationAuthor {
	return predicate.PublicationAuthor(sql.FieldGT(FieldID, id))
}

// IDGTE applies the GTE predicate on the ID field.
func IDGTE(id uuid.UUID) predicate.PublicationAuthor {
	return predicate.PublicationAuthor(sql.FieldGTE(FieldID, id))
}

// IDLT applies the LT predicate on the ID field.
func IDLT(id uuid.UUID) predicate.PublicationAuthor {
	return predicate.PublicationAuthor(sql.FieldLT(FieldID, id))
}

// IDLTE applies the LTE predicate on the ID field.
func IDLTE(id uuid.UUID) predicate.PublicationAuthor {
	return predicate.PublicationAuthor(sql.FieldLTE(FieldID, id))
}

// PublicationID applies equality check predicate on the "publication_id" field. It's identical to PublicationIDEQ.
func PublicationID(v uuid.UUID) predicate.PublicationAuthor {
	return predicate.PublicationAuthor(sql.FieldEQ(FieldPublicationID, v))
}

// AuthorName applies equality check predicate on the "author_name" field. It's identical to AuthorNameEQ.
func AuthorName(v string) predicate.PublicationAuthor {
	return predicate.PublicationAuthor(sql.FieldEQ(FieldAuthorName, v))
}

// AuthorOrder applies equality check predicate on the "author_order" field. It's identical to AuthorOrderEQ.
func AuthorOrder(v int) predicate.PublicationAuthor {
	return predicate.PublicationAuthor(sql.FieldEQ(FieldAuthorOrder, v))
}

// IsCorresponding applies equality check predicate on the "is_corresponding" field. It's identical to IsCorrespondingEQ.
func IsCorresponding(v bool) predicate.PublicationAuthor {
	return predicate.PublicationAuthor(sql.FieldEQ(FieldIsCorresponding, v))
}

// Affiliation applies equality check predicate on the "affiliation" field. It's identical to AffiliationEQ.
func Affiliation(v string) predicate.PublicationAuthor {
	return predicate.PublicationAuthor(sql.FieldEQ(FieldAffiliation, v))
}

// CreatedAt applies equality check predicate on the "created_at" field. It's identical to CreatedAtEQ.
func CreatedAt(v time.Time) predicate.PublicationAuthor {
	return predicate.PublicationAuthor(sql.FieldEQ(FieldCreatedAt, v))
}

// UpdatedAt applies equality check predicate on the "updated_at" field. It's identical to UpdatedAtEQ.
func UpdatedAt(v time.Time) predicate.PublicationAuthor {
	return predicate.PublicationAuthor(sql.FieldEQ(FieldUpdatedAt, v))
}

// PublicationIDEQ applies the EQ predicate on the "publication_id" field.
func PublicationIDEQ(v uuid.UUID) predicate.PublicationAuthor {
	return predicate.PublicationAuthor(sql.FieldEQ(FieldPublicationID, v))
}

// PublicationIDNEQ applies the NEQ predicate on the "publication_id" field.
func PublicationIDNEQ(v uuid.UUID) predicate.PublicationAuthor {
	return predicate.PublicationAuthor(sql.FieldNEQ(FieldPublicationID, v))
}

// PublicationIDIn applies the In predicate on the "publication_id" field.
func PublicationIDIn(vs ...uuid.UUID) predicate.PublicationAuthor {
	return predicate.PublicationAuthor(sql.FieldIn(FieldPublicationID, vs...))
}

// PublicationIDNotIn applies the NotIn predicate on the "publication_id" field.
func PublicationIDNotIn(vs ...uuid.UUID) predicate.PublicationAuthor {
	return predicate.PublicationAuthor(sql.FieldNotIn(FieldPublicationID, vs...))
}

// AuthorNameEQ applies the EQ predicate on the "author_name" field.
func AuthorNameEQ(v string) predicate.PublicationAuthor {
	return predicate.PublicationAuthor(sql.FieldEQ(FieldAuthorName, v))
}

// AuthorNameNEQ applies the NEQ predicate on the "author_name" field.
func AuthorNameNEQ(v string) predicate.PublicationAuthor {
	return predicate.PublicationAuthor(sql.FieldNEQ(FieldAuthorName, v))
}

// AuthorNameIn applies the In predicate on the "author_name" field.
func AuthorNameIn(vs ...string) predicate.PublicationAuthor {
	return predicate.PublicationAuthor(sql.FieldIn(FieldAuthorName, vs...))
}

// AuthorNameNotIn applies the NotIn predicate on the "author_name" field.
func AuthorNameNotIn(vs ...string) predicate.PublicationAuthor {
	return predicate.PublicationAuthor(sql.FieldNotIn(FieldAuthorName, vs...))
}

// AuthorNameGT applies the GT predicate on the "author_name" field.
func AuthorNameGT(v string) predicate.PublicationAuthor {
	return predicate.PublicationAuthor(sql.FieldGT(FieldAuthorName, v))
}

// AuthorNameGTE applies the GTE predicate on the "author_name" field.
func AuthorNameGTE(v string) predicate.PublicationAuthor {
	return predicate.PublicationAuthor(sql.FieldGTE(FieldAuthorName, v))
}

// AuthorNameLT applies the LT predicate on the "author_name" field.
func AuthorNameLT(v string) predicate.PublicationAuthor {
	return predicate.PublicationAuthor(sql.FieldLT(FieldAuthorName, v))
}

// AuthorNameLTE applies the LTE predicate on the "author_name" field.
func AuthorNameLTE(v string) predicate.PublicationAuthor {
	return predicate.PublicationAuthor(sql.FieldLTE(FieldAuthorName, v))
}

// AuthorNameContains applies the Contains predicate on the "author_name" field.
func AuthorNameContains(v string) predicate.PublicationAuthor {
	return predicate.PublicationAuthor(sql.FieldContains(FieldAuthorName, v))
}

// AuthorNameHasPrefix applies the HasPrefix predicate on the "author_name" field.
func AuthorNameHasPrefix(v string) predicate.PublicationAuthor {
	return predicate.PublicationAuthor(sql.FieldHasPrefix(FieldAuthorName, v))
}

// AuthorNameHasSuffix applies the HasSuffix predicate on the "author_name" field.
func AuthorNameHasSuffix(v string) predicate.PublicationAuthor {
	return predicate.PublicationAuthor(sql.FieldHasSuffix(FieldAuthorName, v))
}

// AuthorNameEqualFold applies the EqualFold predicate on the "author_name" field.
func AuthorNameEqualFold(v string) predicate.PublicationAuthor {
	return predicate.PublicationAuthor(sql.FieldEqualFold(FieldAuthorName, v))
}

// AuthorNameContainsFold applies the ContainsFold predicate on the "author_name" field.
func AuthorNameContainsFold(v string) predicate.PublicationAuthor {
	return predicate.PublicationAuthor(sql.FieldContainsFold(FieldAuthorName, v))
}

// AuthorOrderEQ applies the EQ predicate on the "author_order" field.
func AuthorOrderEQ(v int) predicate.PublicationAuthor {
	return predicate.PublicationAuthor(sql.FieldEQ(FieldAuthorOrder, v))
}

// AuthorOrderNEQ applies the NEQ predicate on the "author_order" field.
func AuthorOrderNEQ(v int) predicate.PublicationAuthor {
	return predicate.PublicationAuthor(sql.FieldNEQ(FieldAuthorOrder, v))
}

// AuthorOrderIn applies the In predicate on the "author_order" field.
func AuthorOrderIn(vs ...int) predicate.PublicationAuthor {
	return predicate.PublicationAuthor(sql.FieldIn(FieldAuthorOrder, vs...))
}

// AuthorOrderNotIn applies the NotIn predicate on the "author_order" field.
func AuthorOrderNotIn(vs ...int) predicate.PublicationAuthor {
	return predicate.PublicationAuthor(sql.FieldNotIn(FieldAuthorOrder, vs...))
}

// AuthorOrderGT applies the GT predicate on the "author_order" field.
func AuthorOrderGT(v int) predicate.PublicationAuthor {
	return predicate.PublicationAuthor(sql.FieldGT(FieldAuthorOrder, v))
}

// AuthorOrderGTE applies the GTE predicate on the "author_order" field.
func AuthorOrderGTE(v int) predicate.PublicationAuthor {
	return predicate.PublicationAuthor(sql.FieldGTE(FieldAuthorOrder, v))
}

// AuthorOrderLT applies the LT predicate on the "author_order" field.
func AuthorOrderLT(v int) predicate.PublicationAuthor {
	return predicate.PublicationAuthor(sql.FieldLT(FieldAuthorOrder, v))
}

// AuthorOrderLTE applies the LTE predicate on the "author_order" field.
func AuthorOrderLTE(v int) predicate.PublicationAuthor {
	return predicate.PublicationAuthor(sql.FieldLTE(FieldAuthorOrder, v))
}

// IsCorrespondingEQ applies the EQ predicate on the "is_corresponding" field.
func IsCorrespondingEQ(v bool) predicate.PublicationAuthor {
	return predicate.PublicationAuthor(sql.FieldEQ(FieldIsCorresponding, v))
}

// IsCorrespondingNEQ applies the NEQ predicate on the "is_corresponding" field.
func IsCorrespondingNEQ(v bool) predicate.PublicationAuthor {
	return predicate.PublicationAuthor(sql.FieldNEQ(FieldIsCorresponding, v))
}

// AffiliationEQ applies the EQ predicate on the "affiliation" field.
func AffiliationEQ(v string) predicate.PublicationAuthor {
	return predicate.PublicationAuthor(sql.FieldEQ(FieldAffiliation, v))
}

// AffiliationNEQ applies the NEQ predicate on the "affiliation" field.
func AffiliationNEQ(v string) predicate.PublicationAuthor {
	return predicate.PublicationAuthor(sql.FieldNEQ(FieldAffiliation, v))
}

// AffiliationIn applies the In predicate on the "affiliation" field.
func AffiliationIn(vs ...string) predicate.PublicationAuthor {
	return predicate.PublicationAuthor(sql.FieldIn(FieldAffiliation, vs...))
}

// AffiliationNotIn applies the NotIn predicate on the "affiliation" field.
func AffiliationNotIn(vs ...string) predicate.PublicationAuthor {
	return predicate.PublicationAuthor(sql.FieldNotIn(FieldAffiliation, vs...))
}

// AffiliationGT applies the GT predicate on the "affiliation" field.
func AffiliationGT(v string) predicate.PublicationAuthor {
	return predicate.PublicationAuthor(sql.FieldGT(FieldAffiliation, v))
}

// AffiliationGTE applies the GTE predicate on the "affiliation" field.
func AffiliationGTE(v string) predicate.PublicationAuthor {
	return predicate.PublicationAuthor(sql.FieldGTE(FieldAffiliation, v))
}

// AffiliationLT applies the LT predicate on the "affiliation" field.
func AffiliationLT(v string) predicate.PublicationAuthor {
	return predicate.PublicationAuthor(sql.FieldLT(FieldAffiliation, v))
}

// AffiliationLTE applies the LTE predicate on the "affiliation" field.
func AffiliationLTE(v string) predicate.PublicationAuthor {
	return predicate.PublicationAuthor(sql.FieldLTE(FieldAffiliation, v))
}

// AffiliationContains applies the Contains predicate on the "affiliation" field.
func AffiliationContains(v string) predicate.PublicationAuthor {
	return predicate.PublicationAuthor(sql.FieldContains(FieldAffiliation, v))
}

// AffiliationHasPrefix applies the HasPrefix predicate on the "affiliation" field.
func AffiliationHasPrefix(v string) predicate.PublicationAuthor {
	return predicate.PublicationAuthor(sql.FieldHasPrefix(FieldAffiliation, v))
}

// AffiliationHasSuffix applies the HasSuffix predicate on the "affiliation" field.
func AffiliationHasSuffix(v string) predicate.PublicationAuthor {
	return predicate.PublicationAuthor(sql.FieldHasSuffix(FieldAffiliation, v))
}

// AffiliationIsNil applies the IsNil predicate on the "affiliation" field.
func AffiliationIsNil() predicate.PublicationAuthor {
	return predicate.PublicationAuthor(sql.FieldIsNull(FieldAffiliation))
}

// AffiliationNotNil applies the NotNil predicate on the "affiliation" field.
func AffiliationNotNil() predicate.PublicationAuthor {
	return predicate.PublicationAuthor(sql.FieldNotNull(FieldAffiliation))
}

// AffiliationEqualFold applies the EqualFold predicate on the "affiliation" field.
func AffiliationEqualFold(v string) predicate.PublicationAuthor {
	return predicate.PublicationAuthor(sql.FieldEqualFold(FieldAffiliation, v))
}

// AffiliationContainsFold applies the ContainsFold predicate on the "affiliation" field.
func AffiliationContainsFold(v string) predicate.PublicationAuthor {
	return predicate.PublicationAuthor(sql.FieldContainsFold(FieldAffiliation, v))
}

// CreatedAtEQ applies the EQ predicate on the "created_at" field.
func CreatedAtEQ(v time.Time) predicate.PublicationAuthor {
	return predicate.PublicationAuthor(sql.FieldEQ(FieldCreatedAt, v))
}

// CreatedAtNEQ applies the NEQ predicate on the "created_at" field.
func CreatedAtNEQ(v time.Time) predicate.PublicationAuthor {
	return predicate.PublicationAuthor(sql.FieldNEQ(FieldCreatedAt, v))
}

// CreatedAtIn applies the In predicate on the "created_at" field.
func CreatedAtIn(vs ...time.Time) predicate.PublicationAuthor {
	return predicate.PublicationAuthor(sql.FieldIn(FieldCreatedAt, vs...))
}

// CreatedAtNotIn applies the NotIn predicate on the "created_at" field.
func CreatedAtNotIn(vs ...time.Time) predicate.PublicationAuthor {
	return predicate.PublicationAuthor(sql.FieldNotIn(FieldCreatedAt, vs...))
}

// CreatedAtGT applies the GT predicate on the "created_at" field.
func CreatedAtGT(v time.Time) predicate.PublicationAuthor {
	return predicate.PublicationAuthor(sql.FieldGT(FieldCreatedAt, v))
}

// CreatedAtGTE applies the GTE predicate on the "created_at" field.
func CreatedAtGTE(v time.Time) predicate.PublicationAuthor {
	return predicate.PublicationAuthor(sql.FieldGTE(FieldCreatedAt, v))
}

// CreatedAtLT applies the LT predicate on the "created_at" field.
func CreatedAtLT(v time.Time) predicate.PublicationAuthor {
	return predicate.PublicationAuthor(sql.FieldLT(FieldCreatedAt, v))
}

// CreatedAtLTE applies the LTE predicate on the "created_at" field.
func CreatedAtLTE(v time.Time) predicate.PublicationAuthor {
	return predicate.PublicationAuthor(sql.FieldLTE(FieldCreatedAt, v))
}

// UpdatedAtEQ applies the EQ predicate on the "updated_at" field.
func UpdatedAtEQ(v time.Time) predicate.PublicationAuthor {
	return predicate.PublicationAuthor(sql.FieldEQ(FieldUpdatedAt, v))
}

// UpdatedAtNEQ applies the NEQ predicate on the "updated_at" field.
func UpdatedAtNEQ(v time.Time) predicate.PublicationAuthor {
	return predicate.PublicationAuthor(sql.FieldNEQ(FieldUpdatedAt, v))
}

// UpdatedAtIn applies the In predicate on the "updated_at" field.
func UpdatedAtIn(vs ...time.Time) predicate.PublicationAuthor {
	return predicate.PublicationAuthor(sql.FieldIn(FieldUpdatedAt, vs...))
}

// UpdatedAtNotIn applies the NotIn predicate on the "updated_at" field.
func UpdatedAtNotIn(vs ...time.Time) predicate.PublicationAuthor {
	return predicate.PublicationAuthor(sql.FieldNotIn(FieldUpdatedAt, vs...))
}

// UpdatedAtGT applies the GT predicate on the "updated_at" field.
func UpdatedAtGT(v time.Time) predicate.PublicationAuthor {
	return predicate.PublicationAuthor(sql.FieldGT(FieldUpdatedAt, v))
}

// UpdatedAtGTE applies the GTE predicate on the "updated_at" field.
func UpdatedAtGTE(v time.Time) predicate.PublicationAuthor {
	return predicate.PublicationAuthor(sql.FieldGTE(FieldUpdatedAt, v))
}

// UpdatedAtLT applies the LT predicate on the "updated_at" field.
func UpdatedAtLT(v time.Time) predicate.PublicationAuthor {
	return predicate.PublicationAuthor(sql.FieldLT(FieldUpdatedAt, v))
}

// UpdatedAtLTE applies the LTE predicate on the "updated_at" field.
func UpdatedAtLTE(v time.Time) predicate.PublicationAuthor {
	return predicate.PublicationAuthor(sql.FieldLTE(FieldUpdatedAt, v))
}

// HasPublication applies the HasEdge predicate on the "publication" edge.
func HasPublication() predicate.PublicationAuthor {
	return predicate.PublicationAuthor(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, PublicationTable, PublicationColumn),
		)
		sqlgraph.HasNeighbors(s, step)
	})
}

// HasPublicationWith applies the HasEdge predicate on the "publication" edge with a given conditions (other predicates).
func HasPublicationWith(preds ...predicate.Publication) predicate.PublicationAuthor {
	return predicate.PublicationAuthor(func(s *sql.Selector) {
		step := newPublicationStep()
		sqlgraph.HasNeighborsWith(s, step, func(s *sql.Selector) {
			for _, p := range preds {
				p(s)
			}
		})
	})
}

// And groups predicates with the AND operator between them.
func And(predicates ...predicate.PublicationAuthor) predicate.PublicationAuthor {
	return predicate.PublicationAuthor(sql.AndPredicates(predicates...))
}

// Or groups predicates with the OR operator between them.
func Or(predicates ...predicate.PublicationAuthor) predicate.PublicationAuthor {
	return predicate.PublicationAuthor(sql.OrPredicates(predicates...))
}

// Not applies the not operator on the given predicate.
func Not(p predicate.PublicationAuthor) predicate.PublicationAuthor {
	return predicate.PublicationAuthor(sql.NotPredicates(p))
}
