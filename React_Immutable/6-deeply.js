/* eslint-disable */
import { fromJS } from 'immutable';

export default function mergeDeeplyElements(page1, page2) {
  return fromJS(page1).mergeDeep(fromJS(page2));
}