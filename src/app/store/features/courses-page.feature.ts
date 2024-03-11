import { createFeature, createSelector } from '@ngrx/store';
import { coursesReducer } from '@store/reducers/courses.reducer';

export const coursesFeature = createFeature({
  name: 'courses',
  reducer: coursesReducer,
  extraSelectors: ({selectErrors}) => ({
    selectGetAll: createSelector(selectErrors, (errors) => errors.getAll),
    selectHandle: createSelector(selectErrors, (errors) => errors.handle),
    selectLoadMore: createSelector(selectErrors, (errors) => errors.loadMore),
    selectRemove: createSelector(selectErrors, (errors) => errors.remove),
  })
});
