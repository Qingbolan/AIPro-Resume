// Code generated by ent, DO NOT EDIT.

package ent

import (
	"context"
	"silan-backend/internal/ent/educationdetail"
	"silan-backend/internal/ent/predicate"

	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
	"entgo.io/ent/schema/field"
)

// EducationDetailDelete is the builder for deleting a EducationDetail entity.
type EducationDetailDelete struct {
	config
	hooks    []Hook
	mutation *EducationDetailMutation
}

// Where appends a list predicates to the EducationDetailDelete builder.
func (edd *EducationDetailDelete) Where(ps ...predicate.EducationDetail) *EducationDetailDelete {
	edd.mutation.Where(ps...)
	return edd
}

// Exec executes the deletion query and returns how many vertices were deleted.
func (edd *EducationDetailDelete) Exec(ctx context.Context) (int, error) {
	return withHooks(ctx, edd.sqlExec, edd.mutation, edd.hooks)
}

// ExecX is like Exec, but panics if an error occurs.
func (edd *EducationDetailDelete) ExecX(ctx context.Context) int {
	n, err := edd.Exec(ctx)
	if err != nil {
		panic(err)
	}
	return n
}

func (edd *EducationDetailDelete) sqlExec(ctx context.Context) (int, error) {
	_spec := sqlgraph.NewDeleteSpec(educationdetail.Table, sqlgraph.NewFieldSpec(educationdetail.FieldID, field.TypeUUID))
	if ps := edd.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	affected, err := sqlgraph.DeleteNodes(ctx, edd.driver, _spec)
	if err != nil && sqlgraph.IsConstraintError(err) {
		err = &ConstraintError{msg: err.Error(), wrap: err}
	}
	edd.mutation.done = true
	return affected, err
}

// EducationDetailDeleteOne is the builder for deleting a single EducationDetail entity.
type EducationDetailDeleteOne struct {
	edd *EducationDetailDelete
}

// Where appends a list predicates to the EducationDetailDelete builder.
func (eddo *EducationDetailDeleteOne) Where(ps ...predicate.EducationDetail) *EducationDetailDeleteOne {
	eddo.edd.mutation.Where(ps...)
	return eddo
}

// Exec executes the deletion query.
func (eddo *EducationDetailDeleteOne) Exec(ctx context.Context) error {
	n, err := eddo.edd.Exec(ctx)
	switch {
	case err != nil:
		return err
	case n == 0:
		return &NotFoundError{educationdetail.Label}
	default:
		return nil
	}
}

// ExecX is like Exec, but panics if an error occurs.
func (eddo *EducationDetailDeleteOne) ExecX(ctx context.Context) {
	if err := eddo.Exec(ctx); err != nil {
		panic(err)
	}
}
