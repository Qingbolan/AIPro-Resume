// Code generated by ent, DO NOT EDIT.

package ent

import (
	"context"
	"fmt"
	"math"
	"silan-backend/internal/ent/award"
	"silan-backend/internal/ent/awardtranslation"
	"silan-backend/internal/ent/language"
	"silan-backend/internal/ent/predicate"

	"entgo.io/ent"
	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
	"entgo.io/ent/schema/field"
	"github.com/google/uuid"
)

// AwardTranslationQuery is the builder for querying AwardTranslation entities.
type AwardTranslationQuery struct {
	config
	ctx          *QueryContext
	order        []awardtranslation.OrderOption
	inters       []Interceptor
	predicates   []predicate.AwardTranslation
	withAward    *AwardQuery
	withLanguage *LanguageQuery
	// intermediate query (i.e. traversal path).
	sql  *sql.Selector
	path func(context.Context) (*sql.Selector, error)
}

// Where adds a new predicate for the AwardTranslationQuery builder.
func (atq *AwardTranslationQuery) Where(ps ...predicate.AwardTranslation) *AwardTranslationQuery {
	atq.predicates = append(atq.predicates, ps...)
	return atq
}

// Limit the number of records to be returned by this query.
func (atq *AwardTranslationQuery) Limit(limit int) *AwardTranslationQuery {
	atq.ctx.Limit = &limit
	return atq
}

// Offset to start from.
func (atq *AwardTranslationQuery) Offset(offset int) *AwardTranslationQuery {
	atq.ctx.Offset = &offset
	return atq
}

// Unique configures the query builder to filter duplicate records on query.
// By default, unique is set to true, and can be disabled using this method.
func (atq *AwardTranslationQuery) Unique(unique bool) *AwardTranslationQuery {
	atq.ctx.Unique = &unique
	return atq
}

// Order specifies how the records should be ordered.
func (atq *AwardTranslationQuery) Order(o ...awardtranslation.OrderOption) *AwardTranslationQuery {
	atq.order = append(atq.order, o...)
	return atq
}

// QueryAward chains the current query on the "award" edge.
func (atq *AwardTranslationQuery) QueryAward() *AwardQuery {
	query := (&AwardClient{config: atq.config}).Query()
	query.path = func(ctx context.Context) (fromU *sql.Selector, err error) {
		if err := atq.prepareQuery(ctx); err != nil {
			return nil, err
		}
		selector := atq.sqlQuery(ctx)
		if err := selector.Err(); err != nil {
			return nil, err
		}
		step := sqlgraph.NewStep(
			sqlgraph.From(awardtranslation.Table, awardtranslation.FieldID, selector),
			sqlgraph.To(award.Table, award.FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, awardtranslation.AwardTable, awardtranslation.AwardColumn),
		)
		fromU = sqlgraph.SetNeighbors(atq.driver.Dialect(), step)
		return fromU, nil
	}
	return query
}

// QueryLanguage chains the current query on the "language" edge.
func (atq *AwardTranslationQuery) QueryLanguage() *LanguageQuery {
	query := (&LanguageClient{config: atq.config}).Query()
	query.path = func(ctx context.Context) (fromU *sql.Selector, err error) {
		if err := atq.prepareQuery(ctx); err != nil {
			return nil, err
		}
		selector := atq.sqlQuery(ctx)
		if err := selector.Err(); err != nil {
			return nil, err
		}
		step := sqlgraph.NewStep(
			sqlgraph.From(awardtranslation.Table, awardtranslation.FieldID, selector),
			sqlgraph.To(language.Table, language.FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, awardtranslation.LanguageTable, awardtranslation.LanguageColumn),
		)
		fromU = sqlgraph.SetNeighbors(atq.driver.Dialect(), step)
		return fromU, nil
	}
	return query
}

// First returns the first AwardTranslation entity from the query.
// Returns a *NotFoundError when no AwardTranslation was found.
func (atq *AwardTranslationQuery) First(ctx context.Context) (*AwardTranslation, error) {
	nodes, err := atq.Limit(1).All(setContextOp(ctx, atq.ctx, ent.OpQueryFirst))
	if err != nil {
		return nil, err
	}
	if len(nodes) == 0 {
		return nil, &NotFoundError{awardtranslation.Label}
	}
	return nodes[0], nil
}

// FirstX is like First, but panics if an error occurs.
func (atq *AwardTranslationQuery) FirstX(ctx context.Context) *AwardTranslation {
	node, err := atq.First(ctx)
	if err != nil && !IsNotFound(err) {
		panic(err)
	}
	return node
}

// FirstID returns the first AwardTranslation ID from the query.
// Returns a *NotFoundError when no AwardTranslation ID was found.
func (atq *AwardTranslationQuery) FirstID(ctx context.Context) (id uuid.UUID, err error) {
	var ids []uuid.UUID
	if ids, err = atq.Limit(1).IDs(setContextOp(ctx, atq.ctx, ent.OpQueryFirstID)); err != nil {
		return
	}
	if len(ids) == 0 {
		err = &NotFoundError{awardtranslation.Label}
		return
	}
	return ids[0], nil
}

// FirstIDX is like FirstID, but panics if an error occurs.
func (atq *AwardTranslationQuery) FirstIDX(ctx context.Context) uuid.UUID {
	id, err := atq.FirstID(ctx)
	if err != nil && !IsNotFound(err) {
		panic(err)
	}
	return id
}

// Only returns a single AwardTranslation entity found by the query, ensuring it only returns one.
// Returns a *NotSingularError when more than one AwardTranslation entity is found.
// Returns a *NotFoundError when no AwardTranslation entities are found.
func (atq *AwardTranslationQuery) Only(ctx context.Context) (*AwardTranslation, error) {
	nodes, err := atq.Limit(2).All(setContextOp(ctx, atq.ctx, ent.OpQueryOnly))
	if err != nil {
		return nil, err
	}
	switch len(nodes) {
	case 1:
		return nodes[0], nil
	case 0:
		return nil, &NotFoundError{awardtranslation.Label}
	default:
		return nil, &NotSingularError{awardtranslation.Label}
	}
}

// OnlyX is like Only, but panics if an error occurs.
func (atq *AwardTranslationQuery) OnlyX(ctx context.Context) *AwardTranslation {
	node, err := atq.Only(ctx)
	if err != nil {
		panic(err)
	}
	return node
}

// OnlyID is like Only, but returns the only AwardTranslation ID in the query.
// Returns a *NotSingularError when more than one AwardTranslation ID is found.
// Returns a *NotFoundError when no entities are found.
func (atq *AwardTranslationQuery) OnlyID(ctx context.Context) (id uuid.UUID, err error) {
	var ids []uuid.UUID
	if ids, err = atq.Limit(2).IDs(setContextOp(ctx, atq.ctx, ent.OpQueryOnlyID)); err != nil {
		return
	}
	switch len(ids) {
	case 1:
		id = ids[0]
	case 0:
		err = &NotFoundError{awardtranslation.Label}
	default:
		err = &NotSingularError{awardtranslation.Label}
	}
	return
}

// OnlyIDX is like OnlyID, but panics if an error occurs.
func (atq *AwardTranslationQuery) OnlyIDX(ctx context.Context) uuid.UUID {
	id, err := atq.OnlyID(ctx)
	if err != nil {
		panic(err)
	}
	return id
}

// All executes the query and returns a list of AwardTranslations.
func (atq *AwardTranslationQuery) All(ctx context.Context) ([]*AwardTranslation, error) {
	ctx = setContextOp(ctx, atq.ctx, ent.OpQueryAll)
	if err := atq.prepareQuery(ctx); err != nil {
		return nil, err
	}
	qr := querierAll[[]*AwardTranslation, *AwardTranslationQuery]()
	return withInterceptors[[]*AwardTranslation](ctx, atq, qr, atq.inters)
}

// AllX is like All, but panics if an error occurs.
func (atq *AwardTranslationQuery) AllX(ctx context.Context) []*AwardTranslation {
	nodes, err := atq.All(ctx)
	if err != nil {
		panic(err)
	}
	return nodes
}

// IDs executes the query and returns a list of AwardTranslation IDs.
func (atq *AwardTranslationQuery) IDs(ctx context.Context) (ids []uuid.UUID, err error) {
	if atq.ctx.Unique == nil && atq.path != nil {
		atq.Unique(true)
	}
	ctx = setContextOp(ctx, atq.ctx, ent.OpQueryIDs)
	if err = atq.Select(awardtranslation.FieldID).Scan(ctx, &ids); err != nil {
		return nil, err
	}
	return ids, nil
}

// IDsX is like IDs, but panics if an error occurs.
func (atq *AwardTranslationQuery) IDsX(ctx context.Context) []uuid.UUID {
	ids, err := atq.IDs(ctx)
	if err != nil {
		panic(err)
	}
	return ids
}

// Count returns the count of the given query.
func (atq *AwardTranslationQuery) Count(ctx context.Context) (int, error) {
	ctx = setContextOp(ctx, atq.ctx, ent.OpQueryCount)
	if err := atq.prepareQuery(ctx); err != nil {
		return 0, err
	}
	return withInterceptors[int](ctx, atq, querierCount[*AwardTranslationQuery](), atq.inters)
}

// CountX is like Count, but panics if an error occurs.
func (atq *AwardTranslationQuery) CountX(ctx context.Context) int {
	count, err := atq.Count(ctx)
	if err != nil {
		panic(err)
	}
	return count
}

// Exist returns true if the query has elements in the graph.
func (atq *AwardTranslationQuery) Exist(ctx context.Context) (bool, error) {
	ctx = setContextOp(ctx, atq.ctx, ent.OpQueryExist)
	switch _, err := atq.FirstID(ctx); {
	case IsNotFound(err):
		return false, nil
	case err != nil:
		return false, fmt.Errorf("ent: check existence: %w", err)
	default:
		return true, nil
	}
}

// ExistX is like Exist, but panics if an error occurs.
func (atq *AwardTranslationQuery) ExistX(ctx context.Context) bool {
	exist, err := atq.Exist(ctx)
	if err != nil {
		panic(err)
	}
	return exist
}

// Clone returns a duplicate of the AwardTranslationQuery builder, including all associated steps. It can be
// used to prepare common query builders and use them differently after the clone is made.
func (atq *AwardTranslationQuery) Clone() *AwardTranslationQuery {
	if atq == nil {
		return nil
	}
	return &AwardTranslationQuery{
		config:       atq.config,
		ctx:          atq.ctx.Clone(),
		order:        append([]awardtranslation.OrderOption{}, atq.order...),
		inters:       append([]Interceptor{}, atq.inters...),
		predicates:   append([]predicate.AwardTranslation{}, atq.predicates...),
		withAward:    atq.withAward.Clone(),
		withLanguage: atq.withLanguage.Clone(),
		// clone intermediate query.
		sql:  atq.sql.Clone(),
		path: atq.path,
	}
}

// WithAward tells the query-builder to eager-load the nodes that are connected to
// the "award" edge. The optional arguments are used to configure the query builder of the edge.
func (atq *AwardTranslationQuery) WithAward(opts ...func(*AwardQuery)) *AwardTranslationQuery {
	query := (&AwardClient{config: atq.config}).Query()
	for _, opt := range opts {
		opt(query)
	}
	atq.withAward = query
	return atq
}

// WithLanguage tells the query-builder to eager-load the nodes that are connected to
// the "language" edge. The optional arguments are used to configure the query builder of the edge.
func (atq *AwardTranslationQuery) WithLanguage(opts ...func(*LanguageQuery)) *AwardTranslationQuery {
	query := (&LanguageClient{config: atq.config}).Query()
	for _, opt := range opts {
		opt(query)
	}
	atq.withLanguage = query
	return atq
}

// GroupBy is used to group vertices by one or more fields/columns.
// It is often used with aggregate functions, like: count, max, mean, min, sum.
//
// Example:
//
//	var v []struct {
//		AwardID uuid.UUID `json:"award_id,omitempty"`
//		Count int `json:"count,omitempty"`
//	}
//
//	client.AwardTranslation.Query().
//		GroupBy(awardtranslation.FieldAwardID).
//		Aggregate(ent.Count()).
//		Scan(ctx, &v)
func (atq *AwardTranslationQuery) GroupBy(field string, fields ...string) *AwardTranslationGroupBy {
	atq.ctx.Fields = append([]string{field}, fields...)
	grbuild := &AwardTranslationGroupBy{build: atq}
	grbuild.flds = &atq.ctx.Fields
	grbuild.label = awardtranslation.Label
	grbuild.scan = grbuild.Scan
	return grbuild
}

// Select allows the selection one or more fields/columns for the given query,
// instead of selecting all fields in the entity.
//
// Example:
//
//	var v []struct {
//		AwardID uuid.UUID `json:"award_id,omitempty"`
//	}
//
//	client.AwardTranslation.Query().
//		Select(awardtranslation.FieldAwardID).
//		Scan(ctx, &v)
func (atq *AwardTranslationQuery) Select(fields ...string) *AwardTranslationSelect {
	atq.ctx.Fields = append(atq.ctx.Fields, fields...)
	sbuild := &AwardTranslationSelect{AwardTranslationQuery: atq}
	sbuild.label = awardtranslation.Label
	sbuild.flds, sbuild.scan = &atq.ctx.Fields, sbuild.Scan
	return sbuild
}

// Aggregate returns a AwardTranslationSelect configured with the given aggregations.
func (atq *AwardTranslationQuery) Aggregate(fns ...AggregateFunc) *AwardTranslationSelect {
	return atq.Select().Aggregate(fns...)
}

func (atq *AwardTranslationQuery) prepareQuery(ctx context.Context) error {
	for _, inter := range atq.inters {
		if inter == nil {
			return fmt.Errorf("ent: uninitialized interceptor (forgotten import ent/runtime?)")
		}
		if trv, ok := inter.(Traverser); ok {
			if err := trv.Traverse(ctx, atq); err != nil {
				return err
			}
		}
	}
	for _, f := range atq.ctx.Fields {
		if !awardtranslation.ValidColumn(f) {
			return &ValidationError{Name: f, err: fmt.Errorf("ent: invalid field %q for query", f)}
		}
	}
	if atq.path != nil {
		prev, err := atq.path(ctx)
		if err != nil {
			return err
		}
		atq.sql = prev
	}
	return nil
}

func (atq *AwardTranslationQuery) sqlAll(ctx context.Context, hooks ...queryHook) ([]*AwardTranslation, error) {
	var (
		nodes       = []*AwardTranslation{}
		_spec       = atq.querySpec()
		loadedTypes = [2]bool{
			atq.withAward != nil,
			atq.withLanguage != nil,
		}
	)
	_spec.ScanValues = func(columns []string) ([]any, error) {
		return (*AwardTranslation).scanValues(nil, columns)
	}
	_spec.Assign = func(columns []string, values []any) error {
		node := &AwardTranslation{config: atq.config}
		nodes = append(nodes, node)
		node.Edges.loadedTypes = loadedTypes
		return node.assignValues(columns, values)
	}
	for i := range hooks {
		hooks[i](ctx, _spec)
	}
	if err := sqlgraph.QueryNodes(ctx, atq.driver, _spec); err != nil {
		return nil, err
	}
	if len(nodes) == 0 {
		return nodes, nil
	}
	if query := atq.withAward; query != nil {
		if err := atq.loadAward(ctx, query, nodes, nil,
			func(n *AwardTranslation, e *Award) { n.Edges.Award = e }); err != nil {
			return nil, err
		}
	}
	if query := atq.withLanguage; query != nil {
		if err := atq.loadLanguage(ctx, query, nodes, nil,
			func(n *AwardTranslation, e *Language) { n.Edges.Language = e }); err != nil {
			return nil, err
		}
	}
	return nodes, nil
}

func (atq *AwardTranslationQuery) loadAward(ctx context.Context, query *AwardQuery, nodes []*AwardTranslation, init func(*AwardTranslation), assign func(*AwardTranslation, *Award)) error {
	ids := make([]uuid.UUID, 0, len(nodes))
	nodeids := make(map[uuid.UUID][]*AwardTranslation)
	for i := range nodes {
		fk := nodes[i].AwardID
		if _, ok := nodeids[fk]; !ok {
			ids = append(ids, fk)
		}
		nodeids[fk] = append(nodeids[fk], nodes[i])
	}
	if len(ids) == 0 {
		return nil
	}
	query.Where(award.IDIn(ids...))
	neighbors, err := query.All(ctx)
	if err != nil {
		return err
	}
	for _, n := range neighbors {
		nodes, ok := nodeids[n.ID]
		if !ok {
			return fmt.Errorf(`unexpected foreign-key "award_id" returned %v`, n.ID)
		}
		for i := range nodes {
			assign(nodes[i], n)
		}
	}
	return nil
}
func (atq *AwardTranslationQuery) loadLanguage(ctx context.Context, query *LanguageQuery, nodes []*AwardTranslation, init func(*AwardTranslation), assign func(*AwardTranslation, *Language)) error {
	ids := make([]string, 0, len(nodes))
	nodeids := make(map[string][]*AwardTranslation)
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

func (atq *AwardTranslationQuery) sqlCount(ctx context.Context) (int, error) {
	_spec := atq.querySpec()
	_spec.Node.Columns = atq.ctx.Fields
	if len(atq.ctx.Fields) > 0 {
		_spec.Unique = atq.ctx.Unique != nil && *atq.ctx.Unique
	}
	return sqlgraph.CountNodes(ctx, atq.driver, _spec)
}

func (atq *AwardTranslationQuery) querySpec() *sqlgraph.QuerySpec {
	_spec := sqlgraph.NewQuerySpec(awardtranslation.Table, awardtranslation.Columns, sqlgraph.NewFieldSpec(awardtranslation.FieldID, field.TypeUUID))
	_spec.From = atq.sql
	if unique := atq.ctx.Unique; unique != nil {
		_spec.Unique = *unique
	} else if atq.path != nil {
		_spec.Unique = true
	}
	if fields := atq.ctx.Fields; len(fields) > 0 {
		_spec.Node.Columns = make([]string, 0, len(fields))
		_spec.Node.Columns = append(_spec.Node.Columns, awardtranslation.FieldID)
		for i := range fields {
			if fields[i] != awardtranslation.FieldID {
				_spec.Node.Columns = append(_spec.Node.Columns, fields[i])
			}
		}
		if atq.withAward != nil {
			_spec.Node.AddColumnOnce(awardtranslation.FieldAwardID)
		}
		if atq.withLanguage != nil {
			_spec.Node.AddColumnOnce(awardtranslation.FieldLanguageCode)
		}
	}
	if ps := atq.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if limit := atq.ctx.Limit; limit != nil {
		_spec.Limit = *limit
	}
	if offset := atq.ctx.Offset; offset != nil {
		_spec.Offset = *offset
	}
	if ps := atq.order; len(ps) > 0 {
		_spec.Order = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	return _spec
}

func (atq *AwardTranslationQuery) sqlQuery(ctx context.Context) *sql.Selector {
	builder := sql.Dialect(atq.driver.Dialect())
	t1 := builder.Table(awardtranslation.Table)
	columns := atq.ctx.Fields
	if len(columns) == 0 {
		columns = awardtranslation.Columns
	}
	selector := builder.Select(t1.Columns(columns...)...).From(t1)
	if atq.sql != nil {
		selector = atq.sql
		selector.Select(selector.Columns(columns...)...)
	}
	if atq.ctx.Unique != nil && *atq.ctx.Unique {
		selector.Distinct()
	}
	for _, p := range atq.predicates {
		p(selector)
	}
	for _, p := range atq.order {
		p(selector)
	}
	if offset := atq.ctx.Offset; offset != nil {
		// limit is mandatory for offset clause. We start
		// with default value, and override it below if needed.
		selector.Offset(*offset).Limit(math.MaxInt32)
	}
	if limit := atq.ctx.Limit; limit != nil {
		selector.Limit(*limit)
	}
	return selector
}

// AwardTranslationGroupBy is the group-by builder for AwardTranslation entities.
type AwardTranslationGroupBy struct {
	selector
	build *AwardTranslationQuery
}

// Aggregate adds the given aggregation functions to the group-by query.
func (atgb *AwardTranslationGroupBy) Aggregate(fns ...AggregateFunc) *AwardTranslationGroupBy {
	atgb.fns = append(atgb.fns, fns...)
	return atgb
}

// Scan applies the selector query and scans the result into the given value.
func (atgb *AwardTranslationGroupBy) Scan(ctx context.Context, v any) error {
	ctx = setContextOp(ctx, atgb.build.ctx, ent.OpQueryGroupBy)
	if err := atgb.build.prepareQuery(ctx); err != nil {
		return err
	}
	return scanWithInterceptors[*AwardTranslationQuery, *AwardTranslationGroupBy](ctx, atgb.build, atgb, atgb.build.inters, v)
}

func (atgb *AwardTranslationGroupBy) sqlScan(ctx context.Context, root *AwardTranslationQuery, v any) error {
	selector := root.sqlQuery(ctx).Select()
	aggregation := make([]string, 0, len(atgb.fns))
	for _, fn := range atgb.fns {
		aggregation = append(aggregation, fn(selector))
	}
	if len(selector.SelectedColumns()) == 0 {
		columns := make([]string, 0, len(*atgb.flds)+len(atgb.fns))
		for _, f := range *atgb.flds {
			columns = append(columns, selector.C(f))
		}
		columns = append(columns, aggregation...)
		selector.Select(columns...)
	}
	selector.GroupBy(selector.Columns(*atgb.flds...)...)
	if err := selector.Err(); err != nil {
		return err
	}
	rows := &sql.Rows{}
	query, args := selector.Query()
	if err := atgb.build.driver.Query(ctx, query, args, rows); err != nil {
		return err
	}
	defer rows.Close()
	return sql.ScanSlice(rows, v)
}

// AwardTranslationSelect is the builder for selecting fields of AwardTranslation entities.
type AwardTranslationSelect struct {
	*AwardTranslationQuery
	selector
}

// Aggregate adds the given aggregation functions to the selector query.
func (ats *AwardTranslationSelect) Aggregate(fns ...AggregateFunc) *AwardTranslationSelect {
	ats.fns = append(ats.fns, fns...)
	return ats
}

// Scan applies the selector query and scans the result into the given value.
func (ats *AwardTranslationSelect) Scan(ctx context.Context, v any) error {
	ctx = setContextOp(ctx, ats.ctx, ent.OpQuerySelect)
	if err := ats.prepareQuery(ctx); err != nil {
		return err
	}
	return scanWithInterceptors[*AwardTranslationQuery, *AwardTranslationSelect](ctx, ats.AwardTranslationQuery, ats, ats.inters, v)
}

func (ats *AwardTranslationSelect) sqlScan(ctx context.Context, root *AwardTranslationQuery, v any) error {
	selector := root.sqlQuery(ctx)
	aggregation := make([]string, 0, len(ats.fns))
	for _, fn := range ats.fns {
		aggregation = append(aggregation, fn(selector))
	}
	switch n := len(*ats.selector.flds); {
	case n == 0 && len(aggregation) > 0:
		selector.Select(aggregation...)
	case n != 0 && len(aggregation) > 0:
		selector.AppendSelect(aggregation...)
	}
	rows := &sql.Rows{}
	query, args := selector.Query()
	if err := ats.driver.Query(ctx, query, args, rows); err != nil {
		return err
	}
	defer rows.Close()
	return sql.ScanSlice(rows, v)
}
