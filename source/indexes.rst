Indexes
=======

The datastore doesn't provide a good and efficient method for pagination.
In traditional relational (SQL) databases, it's common to implement pagination using skip - ignoring
results before the given page and fetch only the results of the requested page.
This is possible on the datastore too, but is highly inefficient. Each skipped result costs time and one small-op.
Therefore, ViUR doesn't provide support for this pagination method.
The recommended method for pagination on the GAE is using cursors. While this approach is efficient,
it has one mayor drawback: It doesn't allow for random access. The user is forced to click ``next page'' five
times to reach the fifth page, he cannot jump to that page directly.
ViUR provides a functionality which solves that problem under certain circumstances.
It can store an index for each query in the datastore, containing a list of start-cursors (one for each page).
This way, it's possible to provide efficient random access to lists.
As said, this works only under certain circumstances:

 - You *must* know all possible querys in advance. This implies that the total number of queries is limited.
  Note that queries with the same structure, but with different parameters are different queries in this case
  (price\$gt=5 and price\$gt=10 are *different* queries!).
 - On adding/editing/deleting an entry, you *must* be able to name all queries that might contain this entry.
 - The average write-rate per index *should* not exceed 1/min. It wont fail if it does, but its efficiency will decrease!


If these requirements are meet, using an index is easy.
Create a new instance of the indexmannager, specifying the pageSize (number of results per page) and maxPage (upper bound of pages).
The pageSize must match the limit of the queries run later.
Then just create your datastore query as usual (by calling db.Query or skel.all()) and call
:py:func:`server.indexes.IndexMannager.cursorForQuery` with this query and the page the user requested.
It will return an cursor that points to the first element of the requested page. If the page is out-of-range for
the given query (or it exceeds maxPages), None is returned (which can still be safely passed to query.setCursor as it means ``first page'').
Alternatively it's possible to call :py:func:`server.indexes.IndexMannager.getPages` with that query,
returning a list of startcursors (one cursor per page).
The length of that list equals the total amout of pages available for this query.
If an entry is added/edited/deleted, create the queries that might contain this entry (again using db.Query() or skel.all()) and pass these
queries to :py:func:`server.indexes.IndexMannager.refreshIndex`.
