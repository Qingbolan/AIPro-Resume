// Code generated by ent, DO NOT EDIT.

package ent

import (
	"context"
	"fmt"
	"math"
	"silan-backend/internal/ent/language"
	"silan-backend/internal/ent/predicate"
	"silan-backend/internal/ent/recentupdate"
	"silan-backend/internal/ent/recentupdatetranslation"

	"entgo.io/ent"
	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
	"entgo.io/ent/schema/field"
	"github.com/google/uuid"
)

// RecentUpdateTranslationQuery is the builder for querying RecentUpdateTranslation entities.
type RecentUpdateTranslationQuery struct {
	config
	ctx              *QueryContext
	order            []recentupdatetranslation.OrderOption
	inters           []Interceptor
	predicates       []predicate.RecentUpdateTranslation
	withRecentUpdate *RecentUpdateQuery
	withLanguage     *LanguageQuery
	// intermediate query (i.e. traversal path).
	sql  *sql.Selector
	path func(context.Context) (*sql.Selector, error)
}

// Where adds a new predicate for the RecentUpdateTranslationQuery builder.
func (rutq *RecentUpdateTranslationQuery) Where(ps ...predicate.RecentUpdateTranslation) *RecentUpdateTranslationQuery {
	rutq.predicates = append(rutq.predicates, ps...)
	return rutq
}

// Limit the number of records to be returned by this query.
func (rutq *RecentUpdateTranslationQuery) Limit(limit int) *RecentUpdateTranslationQuery {
	rutq.ctx.Limit = &limit
	return rutq
}

// Offset to start from.
func (rutq *RecentUpdateTranslationQuery) Offset(offset int) *RecentUpdateTranslationQuery {
	rutq.ctx.Offset = &offset
	return rutq
}

// Unique configures the query builder to filter duplicate records on query.
// By default, unique is set to true, and can be disabled using this method.
func (rutq *RecentUpdateTranslationQuery) Unique(unique bool) *RecentUpdateTranslationQuery {
	rutq.ctx.Unique = &unique
	return rutq
}

// Order specifies how the records should be ordered.
func (rutq *RecentUpdateTranslationQuery) Order(o ...recentupdatetranslation.OrderOption) *RecentUpdateTranslationQuery {
	rutq.order = append(rutq.order, o...)
	return rutq
}

// QueryRecentUpdate chains the current query on the "recent_update" edge.
func (rutq *RecentUpdateTranslationQuery) QueryRecentUpdate() *RecentUpdateQuery {
	query := (&RecentUpdateClient{config: rutq.config}).Query()
	query.path = func(ctx context.Context) (fromU *sql.Selector, err error) {
		if err := rutq.prepareQuery(ctx); err != nil {
			return nil, err
		}
		selector := rutq.sqlQuery(ctx)
		if err := selector.Err(); err != nil {
			return nil, err
		}
		step := sqlgraph.NewStep(
			sqlgraph.From(recentupdatetranslation.Table, recentupdatetranslation.FieldID, selector),
			sqlgraph.To(recentupdate.Table, recentupdate.FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, recentupdatetranslation.RecentUpdateTable, recentupdatetranslation.RecentUpdateColumn),
		)
		fromU = sqlgraph.SetNeighbors(rutq.driver.Dialect(), step)
		return fromU, nil
	}
	return query
}

// QueryLanguage chains the current query on the "language" edge.
func (rutq *RecentUpdateTranslationQuery) QueryLanguage() *LanguageQuery {
	query := (&LanguageClient{config: rutq.config}).Query()
	query.path = func(ctx context.Context) (fromU *sql.Selector, err error) {
		if err := rutq.prepareQuery(ctx); err != nil {
			return nil, err
		}
		selector := rutq.sqlQuery(ctx)
		if err := selector.Err(); err != nil {
			return nil, err
		}
		step := sqlgraph.NewStep(
			sqlgraph.From(recentupdatetranslation.Table, recentupdatetranslation.FieldID, selector),
			sqlgraph.To(language.Table, language.FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, recentupdatetranslation.LanguageTable, recentupdatetranslation.LanguageColumn),
		)
		fromU = sqlgraph.SetNeighbors(rutq.driver.Dialect(), step)
		return fromU, nil
	}
	return query
}

// First returns the first RecentUpdateTranslation entity from the query.
// Returns a *NotFoundError when no RecentUpdateTranslation was found.
func (rutq *RecentUpdateTranslationQuery) First(ctx context.Context) (*RecentUpdateTranslation, error) {
	nodes, err := rutq.Limit(1).All(setContextOp(ctx, rutq.ctx, ent.OpQueryFirst))
	if err != nil {
		return nil, err
	}
	if len(nodes) == 0 {
		return nil, &NotFoundError{recentupdatetranslation.Label}
	}
	return nodes[0], nil
}

// FirstX is like First, but panics if an error occurs.
func (rutq *RecentUpdateTranslationQuery) FirstX(ctx context.Context) *RecentUpdateTranslation {
	node, err := rutq.First(ctx)
	if err != nil && !IsNotFound(err) {
		panic(err)
	}
	return node
}

// FirstID returns the first RecentUpdateTranslation ID from the query.
// Returns a *NotFoundError when no RecentUpdateTranslation ID was found.
func (rutq *RecentUpdateTranslationQuery) FirstID(ctx context.Context) (id uuid.UUID, err error) {
	var ids []uuid.UUID
	if ids, err = rutq.Limit(1).IDs(setContextOp(ctx, rutq.ctx, ent.OpQueryFirstID)); err != nil {
		return
	}
	if len(ids) == 0 {
		err = &NotFoundError{recentupdatetranslation.Label}
		return
	}
	return ids[0], nil
}

// FirstIDX is like FirstID, but panics if an error occurs.
func (rutq *RecentUpdateTranslationQuery) FirstIDX(ctx context.Context) uuid.UUID {
	id, err := rutq.FirstID(ctx)
	if err != nil && !IsNotFound(err) {
		panic(err)
	}
	return id
}

// Only returns a single RecentUpdateTranslation entity found by the query, ensuring it only returns one.
// Returns a *NotSingularError when more than one RecentUpdateTranslation entity is found.
// Returns a *NotFoundError when no RecentUpdateTranslation entities are found.
func (rutq *RecentUpdateTranslationQuery) Only(ctx context.Context) (*RecentUpdateTranslation, error) {
	nodes, err := rutq.Limit(2).All(setContextOp(ctx, rutq.ctx, ent.OpQueryOnly))
	if err != nil {
		return nil, err
	}
	switch len(nodes) {
	case 1:
		return nodes[0], nil
	case 0:
		return nil, &NotFoundError{recentupdatetranslation.Label}
	default:
		return nil, &NotSingularError{recentupdatetranslation.Label}
	}
}

// OnlyX is like Only, but panics if an error occurs.
func (rutq *RecentUpdateTranslationQuery) OnlyX(ctx context.Context) *RecentUpdateTranslation {
	node, err := rutq.Only(ctx)
	if err != nil {
		panic(err)
	}
	return node
}

// OnlyID is like Only, but returns the only RecentUpdateTranslation ID in the query.
// Returns a *NotSingularError when more than one RecentUpdateTranslation ID is found.
// Returns a *NotFoundError when no entities are found.
func (rutq *RecentUpdateTranslationQuery) OnlyID(ctx context.Context) (id uuid.UUID, err error) {
	var ids []uuid.UUID
	if ids, err = rutq.Limit(2).IDs(setContextOp(ctx, rutq.ctx, ent.OpQueryOnlyID)); err != nil {
		return
	}
	switch len(ids) {
	case 1:
		id = ids[0]
	case 0:
		err = &NotFoundError{recentupdatetranslation.Label}
	default:
		err = &NotSingularError{recentupdatetranslation.Label}
	}
	return
}

// OnlyIDX is like OnlyID, but panics if an error occurs.
func (rutq *RecentUpdateTranslationQuery) OnlyIDX(ctx context.Context) uuid.UUID {
	id, err := rutq.OnlyID(ctx)
	if err != nil {
		panic(err)
	}
	return id
}

// All executes the query and returns a list of RecentUpdateTranslations.
func (rutq *RecentUpdateTranslationQuery) All(ctx context.Context) ([]*RecentUpdateTranslation, error) {
	ctx = setContextOp(ctx, rutq.ctx, ent.OpQueryAll)
	if err := rutq.prepareQuery(ctx); err != nil {
		return nil, err
	}
	qr := querierAll[[]*RecentUpdateTranslation, *RecentUpdateTranslationQuery]()
	return withInterceptors[[]*RecentUpdateTranslation](ctx, rutq, qr, rutq.inters)
}

// AllX is like All, but panics if an error occurs.
func (rutq *RecentUpdateTranslationQuery) AllX(ctx context.Context) []*RecentUpdateTranslation {
	nodes, err := rutq.All(ctx)
	if err != nil {
		panic(err)
	}
	return nodes
}

// IDs executes the query and returns a list of RecentUpdateTranslation IDs.
func (rutq *RecentUpdateTranslationQuery) IDs(ctx context.Context) (ids []uuid.UUID, err error) {
	if rutq.ctx.Unique == nil && rutq.path != nil {
		rutq.Unique(true)
	}
	ctx = setContextOp(ctx, rutq.ctx, ent.OpQueryIDs)
	if err = rutq.Select(recentupdatetranslation.FieldID).Scan(ctx, &ids); err != nil {
		return nil, err
	}
	return ids, nil
}

// IDsX is like IDs, but panics if an error occurs.
func (rutq *RecentUpdateTranslationQuery) IDsX(ctx context.Context) []uuid.UUID {
	ids, err := rutq.IDs(ctx)
	if err != nil {
		panic(err)
	}
	return ids
}

// Count returns the count of the given query.
func (rutq *RecentUpdateTranslationQuery) Count(ctx context.Context) (int, error) {
	ctx = setContextOp(ctx, rutq.ctx, ent.OpQueryCount)
	if err := rutq.prepareQuery(ctx); err != nil {
		return 0, err
	}
	return withInterceptors[int](ctx, rutq, querierCount[*RecentUpdateTranslationQuery](), rutq.inters)
}

// CountX is like Count, but panics if an error occurs.
func (rutq *RecentUpdateTranslationQuery) CountX(ctx context.Context) int {
	count, err := rutq.Count(ctx)
	if err != nil {
		panic(err)
	}
	return count
}

// Exist returns true if the query has elements in the graph.
func (rutq *RecentUpdateTranslationQuery) Exist(ctx context.Context) (bool, error) {
	ctx = setContextOp(ctx, rutq.ctx, ent.OpQueryExist)
	switch _, err := rutq.FirstID(ctx); {
	case IsNotFound(err):
		return false, nil
	case err != nil:
		return false, fmt.Errorf("ent: check existence: %w", err)
	default:
		return true, nil
	}
}

// ExistX is like Exist, but panics if an error occurs.
func (rutq *RecentUpdateTranslationQuery) ExistX(ctx context.Context) bool {
	exist, err := rutq.Exist(ctx)
	if err != nil {
		panic(err)
	}
	return exist
}

// Clone returns a duplicate of the RecentUpdateTranslationQuery builder, including all associated steps. It can be
// used to prepare common query builders and use them differently after the clone is made.
func (rutq *RecentUpdateTranslationQuery) Clone() *RecentUpdateTranslationQuery {
	if rutq == nil {
		return nil
	}
	return &RecentUpdateTranslationQuery{
		config:           rutq.config,
		ctx:              rutq.ctx.Clone(),
		order:            append([]recentupdatetranslation.OrderOption{}, rutq.order...),
		inters:           append([]Interceptor{}, rutq.inters...),
		predicates:       append([]predicate.RecentUpdateTranslation{}, rutq.predicates...),
		withRecentUpdate: rutq.withRecentUpdate.Clone(),
		withLanguage:     rutq.withLanguage.Clone(),
		// clone intermediate query.
		sql:  rutq.sql.Clone(),
		path: rutq.path,
	}
}

// WithRecentUpdate tells the query-builder to eager-load the nodes that are connected to
// the "recent_update" edge. The optional arguments are used to configure the query builder of the edge.
func (rutq *RecentUpdateTranslationQuery) WithRecentUpdate(opts ...func(*RecentUpdateQuery)) *RecentUpdateTranslationQuery {
	query := (&RecentUpdateClient{config: rutq.config}).Query()
	for _, opt := range opts {
		opt(query)
	}
	rutq.withRecentUpdate = query
	return rutq
}

// WithLanguage tells the query-builder to eager-load the nodes that are connected to
// the "language" edge. The optional arguments are used to configure the query builder of the edge.
func (rutq *RecentUpdateTranslationQuery) WithLanguage(opts ...func(*LanguageQuery)) *RecentUpdateTranslationQuery {
	query := (&LanguageClient{config: rutq.config}).Query()
	for _, opt := range opts {
		opt(query)
	}
	rutq.withLanguage = query
	return rutq
}

// GroupBy is used to group vertices by one or more fields/columns.
// It is often used with aggregate functions, like: count, max, mean, min, sum.
//
// Example:
//
//	var v []struct {
//		RecentUpdateID uuid.UUID `json:"recent_update_id,omitempty"`
//		Count int `json:"count,omitempty"`
//	}
//
//	client.RecentUpdateTranslation.Query().
//		GroupBy(recentupdatetranslation.FieldRecentUpdateID).
//		Aggregate(ent.Count()).
//		Scan(ctx, &v)
func (rutq *RecentUpdateTranslationQuery) GroupBy(field string, fields ...string) *RecentUpdateTranslationGroupBy {
	rutq.ctx.Fields = append([]string{field}, fields...)
	grbuild := &RecentUpdateTranslationGroupBy{build: rutq}
	grbuild.flds = &rutq.ctx.Fields
	grbuild.label = recentupdatetranslation.Label
	grbuild.scan = grbuild.Scan
	return grbuild
}

// Select allows the selection one or more fields/columns for the given query,
// instead of selecting all fields in the entity.
//
// Example:
//
//	var v []struct {
//		RecentUpdateID uuid.UUID `json:"recent_update_id,omitempty"`
//	}
//
//	client.RecentUpdateTranslation.Query().
//		Select(recentupdatetranslation.FieldRecentUpdateID).
//		Scan(ctx, &v)
func (rutq *RecentUpdateTranslationQuery) Select(fields ...string) *RecentUpdateTranslationSelect {
	rutq.ctx.Fields = append(rutq.ctx.Fields, fields...)
	sbuild := &RecentUpdateTranslationSelect{RecentUpdateTranslationQuery: rutq}
	sbuild.label = recentupdatetranslation.Label
	sbuild.flds, sbuild.scan = &rutq.ctx.Fields, sbuild.Scan
	return sbuild
}

// Aggregate returns a RecentUpdateTranslationSelect configured with the given aggregations.
func (rutq *RecentUpdateTranslationQuery) Aggregate(fns ...AggregateFunc) *RecentUpdateTranslationSelect {
	return rutq.Select().Aggregate(fns...)
}

func (rutq *RecentUpdateTranslationQuery) prepareQuery(ctx context.Context) error {
	for _, inter := range rutq.inters {
		if inter == nil {
			return fmt.Errorf("ent: uninitialized interceptor (forgotten import ent/runtime?)")
		}
		if trv, ok := inter.(Traverser); ok {
			if err := trv.Traverse(ctx, rutq); err != nil {
				return err
			}
		}
	}
	for _, f := range rutq.ctx.Fields {
		if !recentupdatetranslation.ValidColumn(f) {
			return &ValidationError{Name: f, err: fmt.Errorf("ent: invalid field %q for query", f)}
		}
	}
	if rutq.path != nil {
		prev, err := rutq.path(ctx)
		if err != nil {
			return err
		}
		rutq.sql = prev
	}
	return nil
}

func (rutq *RecentUpdateTranslationQuery) sqlAll(ctx context.Context, hooks ...queryHook) ([]*RecentUpdateTranslation, error) {
	var (
		nodes       = []*RecentUpdateTranslation{}
		_spec       = rutq.querySpec()
		loadedTypes = [2]bool{
			rutq.withRecentUpdate != nil,
			rutq.withLanguage != nil,
		}
	)
	_spec.ScanValues = func(columns []string) ([]any, error) {
		return (*RecentUpdateTranslation).scanValues(nil, columns)
	}
	_spec.Assign = func(columns []string, values []any) error {
		node := &RecentUpdateTranslation{config: rutq.config}
		nodes = append(nodes, node)
		node.Edges.loadedTypes = loadedTypes
		return node.assignValues(columns, values)
	}
	for i := range hooks {
		hooks[i](ctx, _spec)
	}
	if err := sqlgraph.QueryNodes(ctx, rutq.driver, _spec); err != nil {
		return nil, err
	}
	if len(nodes) == 0 {
		return nodes, nil
	}
	if query := rutq.withRecentUpdate; query != nil {
		if err := rutq.loadRecentUpdate(ctx, query, nodes, nil,
			func(n *RecentUpdateTranslation, e *RecentUpdate) { n.Edges.RecentUpdate = e }); err != nil {
			return nil, err
		}
	}
	if query := rutq.withLanguage; query != nil {
		if err := rutq.loadLanguage(ctx, query, nodes, nil,
			func(n *RecentUpdateTranslation, e *Language) { n.Edges.Language = e }); err != nil {
			return nil, err
		}
	}
	return nodes, nil
}

func (rutq *RecentUpdateTranslationQuery) loadRecentUpdate(ctx context.Context, query *RecentUpdateQuery, nodes []*RecentUpdateTranslation, init func(*RecentUpdateTranslation), assign func(*RecentUpdateTranslation, *RecentUpdate)) error {
	ids := make([]uuid.UUID, 0, len(nodes))
	nodeids := make(map[uuid.UUID][]*RecentUpdateTranslation)
	for i := range nodes {
		fk := nodes[i].RecentUpdateID
		if _, ok := nodeids[fk]; !ok {
			ids = append(ids, fk)
		}
		nodeids[fk] = append(nodeids[fk], nodes[i])
	}
	if len(ids) == 0 {
		return nil
	}
	query.Where(recentupdate.IDIn(ids...))
	neighbors, err := query.All(ctx)
	if err != nil {
		return err
	}
	for _, n := range neighbors {
		nodes, ok := nodeids[n.ID]
		if !ok {
			return fmt.Errorf(`unexpected foreign-key "recent_update_id" returned %v`, n.ID)
		}
		for i := range nodes {
			assign(nodes[i], n)
		}
	}
	return nil
}
func (rutq *RecentUpdateTranslationQuery) loadLanguage(ctx context.Context, query *LanguageQuery, nodes []*RecentUpdateTranslation, init func(*RecentUpdateTranslation), assign func(*RecentUpdateTranslation, *Language)) error {
	ids := make([]string, 0, len(nodes))
	nodeids := make(map[string][]*RecentUpdateTranslation)
	for i := range nodes {
		fk := nodes[i].LanguageCode
		if _, ok := nodeids[fk]; !ok {
			ids = append(ids, fk)
		}
		nodeids[fk] = append(nodeids[fk], nodes[i])
	}
	if len(ids) == 0 {
		return nil
	}
	query.Where(language.IDIn(ids...))
	neighbors, err := query.All(ctx)
	if err != nil {
		return err
	}
	for _, n := range neighbors {
		nodes, ok := nodeids[n.ID]
		if !ok {
			return fmt.Errorf(`unexpected foreign-key "language_code" returned %v`, n.ID)
		}
		for i := range nodes {
			assign(nodes[i], n)
		}
	}
	return nil
}

func (rutq *RecentUpdateTranslationQuery) sqlCount(ctx context.Context) (int, error) {
	_spec := rutq.querySpec()
	_spec.Node.Columns = rutq.ctx.Fields
	if len(rutq.ctx.Fields) > 0 {
		_spec.Unique = rutq.ctx.Unique != nil && *rutq.ctx.Unique
	}
	return sqlgraph.CountNodes(ctx, rutq.driver, _spec)
}

func (rutq *RecentUpdateTranslationQuery) querySpec() *sqlgraph.QuerySpec {
	_spec := sqlgraph.NewQuerySpec(recentupdatetranslation.Table, recentupdatetranslation.Columns, sqlgraph.NewFieldSpec(recentupdatetranslation.FieldID, field.TypeUUID))
	_spec.From = rutq.sql
	if unique := rutq.ctx.Unique; unique != nil {
		_spec.Unique = *unique
	} else if rutq.path != nil {
		_spec.Unique = true
	}
	if fields := rutq.ctx.Fields; len(fields) > 0 {
		_spec.Node.Columns = make([]string, 0, len(fields))
		_spec.Node.Columns = append(_spec.Node.Columns, recentupdatetranslation.FieldID)
		for i := range fields {
			if fields[i] != recentupdatetranslation.FieldID {
				_spec.Node.Columns = append(_spec.Node.Columns, fields[i])
			}
		}
		if rutq.withRecentUpdate != nil {
			_spec.Node.AddColumnOnce(recentupdatetranslation.FieldRecentUpdateID)
		}
		if rutq.withLanguage != nil {
			_spec.Node.AddColumnOnce(recentupdatetranslation.FieldLanguageCode)
		}
	}
	if ps := rutq.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if limit := rutq.ctx.Limit; limit != nil {
		_spec.Limit = *limit
	}
	if offset := rutq.ctx.Offset; offset != nil {
		_spec.Offset = *offset
	}
	if ps := rutq.order; len(ps) > 0 {
		_spec.Order = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	return _spec
}

func (rutq *RecentUpdateTranslationQuery) sqlQuery(ctx context.Context) *sql.Selector {
	builder := sql.Dialect(rutq.driver.Dialect())
	t1 := builder.Table(recentupdatetranslation.Table)
	columns := rutq.ctx.Fields
	if len(columns) == 0 {
		columns = recentupdatetranslation.Columns
	}
	selector := builder.Select(t1.Columns(columns...)...).From(t1)
	if rutq.sql != nil {
		selector = rutq.sql
		selector.Select(selector.Columns(columns...)...)
	}
	if rutq.ctx.Unique != nil && *rutq.ctx.Unique {
		selector.Distinct()
	}
	for _, p := range rutq.predicates {
		p(selector)
	}
	for _, p := range rutq.order {
		p(selector)
	}
	if offset := rutq.ctx.Offset; offset != nil {
		// limit is mandatory for offset clause. We start
		// with default value, and override it below if needed.
		selector.Offset(*offset).Limit(math.MaxInt32)
	}
	if limit := rutq.ctx.Limit; limit != nil {
		selector.Limit(*limit)
	}
	return selector
}

// RecentUpdateTranslationGroupBy is the group-by builder for RecentUpdateTranslation entities.
type RecentUpdateTranslationGroupBy struct {
	selector
	build *RecentUpdateTranslationQuery
}

// Aggregate adds the given aggregation functions to the group-by query.
func (rutgb *RecentUpdateTranslationGroupBy) Aggregate(fns ...AggregateFunc) *RecentUpdateTranslationGroupBy {
	rutgb.fns = append(rutgb.fns, fns...)
	return rutgb
}

// Scan applies the selector query and scans the result into the given value.
func (rutgb *RecentUpdateTranslationGroupBy) Scan(ctx context.Context, v any) error {
	ctx = setContextOp(ctx, rutgb.build.ctx, ent.OpQueryGroupBy)
	if err := rutgb.build.prepareQuery(ctx); err != nil {
		return err
	}
	return scanWithInterceptors[*RecentUpdateTranslationQuery, *RecentUpdateTranslationGroupBy](ctx, rutgb.build, rutgb, rutgb.build.inters, v)
}

func (rutgb *RecentUpdateTranslationGroupBy) sqlScan(ctx context.Context, root *RecentUpdateTranslationQuery, v any) error {
	selector := root.sqlQuery(ctx).Select()
	aggregation := make([]string, 0, len(rutgb.fns))
	for _, fn := range rutgb.fns {
		aggregation = append(aggregation, fn(selector))
	}
	if len(selector.SelectedColumns()) == 0 {
		columns := make([]string, 0, len(*rutgb.flds)+len(rutgb.fns))
		for _, f := range *rutgb.flds {
			columns = append(columns, selector.C(f))
		}
		columns = append(columns, aggregation...)
		selector.Select(columns...)
	}
	selector.GroupBy(selector.Columns(*rutgb.flds...)...)
	if err := selector.Err(); err != nil {
		return err
	}
	rows := &sql.Rows{}
	query, args := selector.Query()
	if err := rutgb.build.driver.Query(ctx, query, args, rows); err != nil {
		return err
	}
	defer rows.Close()
	return sql.ScanSlice(rows, v)
}

// RecentUpdateTranslationSelect is the builder for selecting fields of RecentUpdateTranslation entities.
type RecentUpdateTranslationSelect struct {
	*RecentUpdateTranslationQuery
	selector
}

// Aggregate adds the given aggregation functions to the selector query.
func (ruts *RecentUpdateTranslationSelect) Aggregate(fns ...AggregateFunc) *RecentUpdateTranslationSelect {
	ruts.fns = append(ruts.fns, fns...)
	return ruts
}

// Scan applies the selector query and scans the result into the given value.
func (ruts *RecentUpdateTranslationSelect) Scan(ctx context.Context, v any) error {
	ctx = setContextOp(ctx, ruts.ctx, ent.OpQuerySelect)
	if err := ruts.prepareQuery(ctx); err != nil {
		return err
	}
	return scanWithInterceptors[*RecentUpdateTranslationQuery, *RecentUpdateTranslationSelect](ctx, ruts.RecentUpdateTranslationQuery, ruts, ruts.inters, v)
}

func (ruts *RecentUpdateTranslationSelect) sqlScan(ctx context.Context, root *RecentUpdateTranslationQuery, v any) error {
	selector := root.sqlQuery(ctx)
	aggregation := make([]string, 0, len(ruts.fns))
	for _, fn := range ruts.fns {
		aggregation = append(aggregation, fn(selector))
	}
	switch n := len(*ruts.selector.flds); {
	case n == 0 && len(aggregation) > 0:
		selector.Select(aggregation...)
	case n != 0 && len(aggregation) > 0:
		selector.AppendSelect(aggregation...)
	}
	rows := &sql.Rows{}
	query, args := selector.Query()
	if err := ruts.driver.Query(ctx, query, args, rows); err != nil {
		return err
	}
	defer rows.Close()
	return sql.ScanSlice(rows, v)
}
