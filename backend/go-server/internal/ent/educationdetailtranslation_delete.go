// Code generated by ent, DO NOT EDIT.

package ent

import (
	"context"
	"silan-backend/internal/ent/educationdetailtranslation"
	"silan-backend/internal/ent/predicate"

	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
	"entgo.io/ent/schema/field"
)

// EducationDetailTranslationDelete is the builder for deleting a EducationDetailTranslation entity.
type EducationDetailTranslationDelete struct {
	config
	hooks    []Hook
	mutation *EducationDetailTranslationMutation
}

// Where appends a list predicates to the EducationDetailTranslationDelete builder.
func (edtd *EducationDetailTranslationDelete) Where(ps ...predicate.EducationDetailTranslation) *EducationDetailTranslationDelete {
	edtd.mutation.Where(ps...)
	return edtd
}

// Exec executes the deletion query and returns how many vertices were deleted.
func (edtd *EducationDetailTranslationDelete) Exec(ctx context.Context) (int, error) {
	return withHooks(ctx, edtd.sqlExec, edtd.mutation, edtd.hooks)
}

// ExecX is like Exec, but panics if an error occurs.
func (edtd *EducationDetailTranslationDelete) ExecX(ctx context.Context) int {
	n, err := edtd.Exec(ctx)
	if err != nil {
		panic(err)
	}
	return n
}

func (edtd *EducationDetailTranslationDelete) sqlExec(ctx context.Context) (int, error) {
	_spec := sqlgraph.NewDeleteSpec(educationdetailtranslation.Table, sqlgraph.NewFieldSpec(educationdetailtranslation.FieldID, field.TypeUUID))
	if ps := edtd.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	affected, err := sqlgraph.DeleteNodes(ctx, edtd.driver, _spec)
	if err != nil && sqlgraph.IsConstraintError(err) {
		err = &ConstraintError{msg: err.Error(), wrap: err}
	}
	edtd.mutation.done = true
	return affected, err
}

// EducationDetailTranslationDeleteOne is the builder for deleting a single EducationDetailTranslation entity.
type EducationDetailTranslationDeleteOne struct {
	edtd *EducationDetailTranslationDelete
}

// Where appends a list predicates to the EducationDetailTranslationDelete builder.
func (edtdo *EducationDetailTranslationDeleteOne) Where(ps ...predicate.EducationDetailTranslation) *EducationDetailTranslationDeleteOne {
	edtdo.edtd.mutation.Where(ps...)
	return edtdo
}

// Exec executes the deletion query.
func (edtdo *EducationDetailTranslationDeleteOne) Exec(ctx context.Context) error {
	n, err := edtdo.edtd.Exec(ctx)
	switch {
	case err != nil:
		return err
	case n == 0:
		return &NotFoundError{educationdetailtranslation.Label}
	default:
		return nil
	}
}

// ExecX is like Exec, but panics if an error occurs.
func (edtdo *EducationDetailTranslationDeleteOne) ExecX(ctx context.Context) {
	if err := edtdo.Exec(ctx); err != nil {
		panic(err)
	}
}
