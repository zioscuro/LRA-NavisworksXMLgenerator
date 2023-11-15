export function generateClashTestLC1(
  name: any,
  type: any,
  tollerance: any,
  autointersect: any,
  clashgroup: any
) {
  const clashTestDefinition = `<clashtest name="${name}" test_type="${type}" status="new" tolerance="${tollerance}" merge_composites="1">
  <linkage mode="none"/>
  <left>
    <clashselection selfintersect="${autointersect}" primtypes="1">
      <locator>lcop_selection_set_tree/${clashgroup}</locator>
    </clashselection>
  </left>
  <rules/>
</clashtest>
`;

  return clashTestDefinition;
}

export function generateClashTestLC2(number: any, name: any, clashgroupsLeft: any, clashgroupsRight: any) {
  const clashTestDefinition = `<clashtest name="${number}-LC2_${name}" test_type="hard" status="new" tolerance="0.1640419948" merge_composites="1">
  <linkage mode="none"/>
  <left>    
    ${defineClashSelection(clashgroupsLeft)}
  </left>
  <right>
    ${defineClashSelection(clashgroupsRight)}
  </right>
  <rules/>
</clashtest>
`;

  return clashTestDefinition;
}

function defineClashSelection(clashGroupsArray: any) {
  let clashSelection = `<clashselection selfintersect="0" primtypes="1">
  <locator>`;

  clashGroupsArray.forEach((group: any) => {
    clashSelection += `lcop_selection_set_tree/${group};`;
  });

  clashSelection = clashSelection.slice(0, -1);

  clashSelection += `</locator>
  </clashselection>`;

  return clashSelection;
}