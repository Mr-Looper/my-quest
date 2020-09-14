
function calcLevelXp(data) {
  return {
    min: 0,
    max: data.level * 1000,
    current: data.current_xp,
    minText: '0xp',
    maxText: `${data.level * 1000}xp`,
    nextText: `${(data.level * 1000) - data.current_xp}xp`
  }
}

function formatUserdata(data) {
  return {
    username: data.name,
    class_id: data.class_id,
    srcAvatar: data.avatar,
    level: data.level,
    currentXp: data.current_xp,
    progress: calcLevelXp(data)
  }
}

function formatClassesData(classes){
  let arr = []
  for (let property in classes) {
    if (classes.hasOwnProperty(property)) {
      arr.push({
        id: property,
        color: classes[property].color,
        name: classes[property].name,
        level: classes[property].level,
        specialization: formatSpecData(classes[property].specialization),
        progress: calcLevelXp(classes[property])
      })
    }
  }
  return arr
}

function formatSpecData(specs){
  let arr = []
  for (let property in specs) {
    if (specs.hasOwnProperty(property)) {
      arr.push({
        id: property,
        color: specs[property].color,
        name: specs[property].name
      })
    }
  }
  return arr
}

function formatSkillsData(skills){
  let arr = []
  for (let property in skills) {
    if (skills.hasOwnProperty(property)) {
      arr.push({
        id: property,
        color: skills[property].color,
        name: skills[property].name,
        level: skills[property].level,
        max: skills[property].max,
        description: skills[property].description,
        class_id: skills[property].class_id,
        subclass_id: skills[property].subclass_id
      })
    }
  }
  return arr
}

function updateSkills(skills, list){
  let _localList = [...list]
  skills = skills.map(_updSkill => {
    const index = _localList.findIndex(_skill => _updSkill.id === _skill.id)
    _localList[index] = {..._updSkill}
    return {..._updSkill}
  })
  return _localList
}
function formatMissionsData(missions){
  let arr = []
  for (let property in missions) {
    if (missions.hasOwnProperty(property)) {
      arr.push({
        id: property,
        data: missions[property].data,
        type: missions[property].type,
        title: missions[property].title,
        skill: missions[property].skill,
        special_title: missions[property].special_title,
        repeat: missions[property].repeat,
        difficulty: missions[property].difficulty,
        status_id: missions[property].status_id,
        repeat_status_id: missions[property].repeat_status_id,
        skill_id: missions[property].skill_id? missions[property].skill_id : '',
        class_id: missions[property].class_id? missions[property].class_id : '',
        conditions: missions[property].conditions? Object.values(missions[property].conditions) : [],
        progress: calcLevelXp(missions[property])
      })
    }
  }
  return arr
}

function updateSpecializationClass(specializations, class_id, list){
  let _list = [...list]
  const index = _list.findIndex(_class => _class.id === class_id )
  specializations.map(_spec => {
    const indexSpec = _list[index].specialization.findIndex(_currentSpec => _currentSpec.id === _spec.id)
    if(indexSpec !== -1){
      _list[index].specialization[indexSpec] = {..._spec}
    }else{
      if(_list[index].specialization){
        _list[index].specialization.push({..._spec})
      }else{
        _list[index] = {
          ... _list[index],
          specialization: [{..._spec}]
        }
      }
      _list[index].specialization =  _list[index].specialization.filter(_spec => !!_spec.id)
    }
  })
  return _list
}

function deleteSpecializationClass(class_id, subclass_id, list){
  let _list = [...list]
  const indexClass = _list.findIndex(_class => _class.id === class_id)
  _list[indexClass].specialization = _list[indexClass].specialization.filter(_spec => _spec.id !== subclass_id)
  return _list
}


function myData(state = {}, action) {
  switch (action.type) {
    case 'GET_DATA_USER':
      return formatUserdata({ ...action.data })
    default:
      return state
  }
}

function myClasses(state = {}, action) {
  switch (action.type) {
    case 'GET_DATA_CLASSES':
      return formatClassesData({ ...action.data })
    case 'UPDATE_SPECIALIZATION_CLASS':
      return updateSpecializationClass(action.data.list, action.data.class_id, [...state])
    case 'DELETE_SPECIALIZATION_CLASS':
      return deleteSpecializationClass(action.data.class_id, action.data.subclass_id, [...state])
    default:
      return state
  }
}

function myMissions(state = {}, action) {
  switch (action.type) {
    case 'GET_DATA_MISSIONS':
      return formatMissionsData({ ...action.data })
    default:
      return state
  }
}

function mySkills(state = {}, action) {
  switch (action.type) {
    case 'GET_DATA_SKILLS':
      return formatSkillsData({...action.data})
    case 'UPDATE_DATA_SKILLS':
      return updateSkills(action.data, [...state])
    default:
      return state
  }
}

export { myData, myClasses, myMissions, mySkills }