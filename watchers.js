let combatNews = new Observer();

combatNews.Notify = (msg) => {
    let {type, actors, detail} = msg;
    let self, target, result;
    switch(type) {
        case 'ATTACK':
            [self, target] = actors;
            let {damage: damage, hp: targetHP} = detail;
            result = `${self} attacked ${damage} damage: ${target} has ${targetHP} hit points`;
            console.log(result);
            break;
        case 'KILL':
            [self, target] = actors;
            let {xp: xp, token: token} = detail;
            result = `${self} killed ${target}: ${xp} xp, ${token} tokens`
            console.log(result);
            break;
    }
}