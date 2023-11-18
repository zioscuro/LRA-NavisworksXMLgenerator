export function generateClashTestLC1(
  name: string,
  type: string,
  tollerance: number,
  autointersect: boolean,
  clashgroup: string
) {
  const clashTestDefinition = `<clashtest name="${name}" test_type="${type}" status="new" tolerance="${tollerance}" merge_composites="1">
  <linkage mode="none"/>
  <left>
    <clashselection selfintersect="${autointersect ? 1 : 0}" primtypes="1">
      <locator>lcop_selection_set_tree/${clashgroup}</locator>
    </clashselection>
  </left>
  <rules/>
</clashtest>
`;

  return clashTestDefinition;
}

export function generateClashTestLC2(
  number: number,
  name: string,
  selectionSetsLeft: string[],
  selectionSetsRight: string[]
) {
  const clashTestDefinition = `<clashtest name="${number}-LC2_${name}" test_type="hard" status="new" tolerance="0.1640419948" merge_composites="1">
  <linkage mode="none"/>
  <left>    
    ${defineClashSelection(selectionSetsLeft)}
  </left>
  <right>
    ${defineClashSelection(selectionSetsRight)}
  </right>
  <rules/>
</clashtest>
`;

  return clashTestDefinition;
}

function defineClashSelection(selectionSetsArray: string[]) {
  let clashSelection = `<clashselection selfintersect="0" primtypes="1">
  <locator>`;

  selectionSetsArray.forEach((group) => {
    clashSelection += `lcop_selection_set_tree/${group};`;
  });

  clashSelection = clashSelection.slice(0, -1);

  clashSelection += `</locator>
  </clashselection>`;

  return clashSelection;
}
