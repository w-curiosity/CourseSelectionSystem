var sqlMap = {
    user: {
        find_all: 'select * from login where username = ?'
    },

    stu: {
        add: 'insert into S (xh, xm, xb, csrq, jg, sjhm, yxh, pw) values (?,?,?,?,?,?,?,?)',
        show: 'select * from S', 
        select: 'select * from S where xh = ?',
        update: 'update S set xb=?, csrq=?, jg=?, sjhm=?, yxh=? where xh = ?',
        stu_update: 'update S set xb=?, csrq=?, jg=?, sjhm=?, yxh=?, pw=? where xh = ?',
        del: 'delete from S where xh = ?'
    },

    login: {
        add: 'insert into login (username, password, role_id, role_name) values (?,?,?,?)',
        show: 'select * from login where username = ?', 
        select: 'select * from login where username = ?',
        update: 'update login set password=? where username = ?',
        del: 'delete from login where username = ?'
    },

    teacher: {
        add: 'insert into T (gh, xm, xb, csrq, xl, jbgz, yxh, pw) values (?,?,?,?,?,?,?,?)',
        show: 'select * from T', 
        select: 'select * from T where gh = ?',
        select2: 'select gh from T where xm = ?',
        update: 'update T set xb=?, csrq=?, xl=?, jbgz=?, yxh=? where gh = ?',
        teacher_update: 'update T set xb=?, csrq=?, xl=?, jbgz=?, yxh=?, pw=? where gh = ?',
        del: 'delete from T where gh = ?'
    },

    course: {
        add: 'insert into C (kh, km, xf, xs, yxh) values (?,?,?,?,?)',
        show: 'select * from C', 
        select: 'select * from C where kh = ?',
        update: 'update C set xf=?, xs=?, yxh=? where kh = ?',
        del: 'delete from C where kh = ?',
        show1: 'select C.kh,km,xf,xs,O.gh,sksj,O.xq,xm,C.yxh from T,C,O where C.kh=O.kh and O.gh=T.gh and xq=?',
        select1: 'select C.kh,km,xf,xs,O.gh,sksj,O.xq,xm,C.yxh from T,C,O where C.kh=O.kh and O.gh=T.gh and C.kh=?'
    },

    D: {
        add: 'insert into D (yxh, mc, dz, lxdh) values (?,?,?,?)',
        show: 'select * from D', 
        select: 'select * from D where yxh = ?',
        update: 'update D set dz=?, lxdh=? where yxh=?',
        del: 'delete from D where yxh = ?'
    },
    score: {
        add: 'insert into score (scno, scorerange, score) values (?,?,?)',
        show: 'select * from score', 
        select: 'select * from D where scno = ?',
        update: 'update score set scorerange=?, score=? where scno=?',
        del: 'delete from score where scno = ?'
    },

    O: {
        add: 'insert into O (xq, kh, gh, sksj) values (?,?,?,?)',
        show: 'select * from O', 
        select: 'select * from O where xq = ?',
        update: 'update O set xq=?, sksj=? where kh=? and gh = ?',
        del: 'delete from O where kh = ? and gh = ?',
        selectk: 'select xq,O.kh,gh,sksj,xf,xs,km from C,O where O.kh=C.kh and O.kh = ?',
        showc: 'select O.kh,T.xm,sksj,xf,xs,km from C,O,T where O.kh=C.kh and O.gh=T.gh and xq=? and C.kh not in (select E.kh from E where E.xh=? and pscj=0 and kscj=0 and zpcj=0) and sksj not in (select sksj from E,O where E.xh=? and E.kh=O.kh and E.gh=O.gh and pscj=0 and kscj=0 and zpcj=0)'
    },

    currentxq: {
        add: 'insert into now (cxno, currentxq) values (?,?)',
        select: 'select currentxq from now where cxno=1',
        update: 'update now set currentxq=? where cxno=1'
    },

    grade: {
        show: 'select E.kh,E.xh,S.xm,C.km,pscj,kscj,zpcj from E,S,C where E.gh = ? and E.xh=S.xh and E.kh=C.kh and E.xq=?',
        select: 'select E.kh,E.xh,S.xm,C.km,pscj,kscj,zpcj from E,S,C where C.kh = ? and E.xh=S.xh and E.kh=C.kh and E.gh=? and E.xq=?',
        update: 'update E set pscj=?, kscj=? where xh = ? and kh = ? and gh = ?'

    },
    tcourse: {
        show: 'select O.kh,O.sksj,C.km,C.bili from O,C where C.kh=O.kh and O.gh= ? and O.xq=?',
        update: 'update C set bili = ? where kh = ?'
    },
    
    E:{
        add: 'insert into E (xh, xq, kh, gh, pscj, kscj, zpcj) values (?,?,?,?,0,0,0)',
        show: 'select distinct E.kh,km,T.xm,xs,xf,sksj from E,C,O,T where E.kh=C.kh and E.gh=T.gh and E.xh=? and E.xq=? and E.gh=O.gh and E.kh=O.kh and zpcj=0 and pscj=0 and kscj=0',
        del: 'delete from E where kh=? and xh=? and xq=?',
        show1: 'select E.kh,km,xq,gh,xf,pscj,kscj,zpcj from E,C where E.kh=C.kh and xh=? and zpcj>0 and pscj>0 and kscj>0',
        show2: 'select distinct C.kh,km,xs,xf,S.yxh from C,S,E where  C.yxh=S.yxh and S.xh=? and C.kh not in (select E.kh from E where E.xh=? and zpcj>=60)',
    },

    tableMon: {
        show: 'select(select C.km from O,C where O.kh=C.kh and O.xq=? and O.gh=? and(O.sksj="星期一1-2" or O.sksj="星期一1-4"))as km union all select(select C.km from O,C where O.kh=C.kh and O.xq=? and O.gh=? and(O.sksj="星期一3-4"or O.sksj="星期一1-4") )as km union all select(select C.km from O,C where O.kh=C.kh and O.xq=? and O.gh=? and(O.sksj="星期一5-6" or O.sksj="星期一5-8")) as km union all select(select C.km from O,C where O.kh=C.kh and O.xq=? and O.gh=? and(O.sksj="星期一7-8" or O.sksj="星期一5-8"))as km'
    },
    tableTue: {
        show: 'select(select C.km from O,C where O.kh=C.kh and O.xq=? and O.gh=? and(O.sksj="星期二1-2" or O.sksj="星期二1-4"))as km union all select(select C.km from O,C where O.kh=C.kh and O.xq=? and O.gh=? and(O.sksj="星期二 3-4"or O.sksj="星期二1-4") )as km union all select(select C.km from O,C where O.kh=C.kh and O.xq=? and O.gh=? and(O.sksj="星期二5-6" or O.sksj="星期二5-8")) as km union all select(select C.km from O,C where O.kh=C.kh and O.xq=? and O.gh=? and(O.sksj="星期二7-8" or O.sksj="星期二5-8"))as km'
    },    
    tableWed: {
        show: 'select(select C.km from O,C where O.kh=C.kh and O.xq=? and O.gh=? and(O.sksj="星期三1-2" or O.sksj="星期三1-4"))as km union all select(select C.km from O,C where O.kh=C.kh and O.xq=? and O.gh=? and(O.sksj="星期三 3-4"or O.sksj="星期三1-4") )as km union all select(select C.km from O,C where O.kh=C.kh and O.xq=? and O.gh=? and(O.sksj="星期三5-6" or O.sksj="星期三5-8")) as km union all select(select C.km from O,C where O.kh=C.kh and O.xq=? and O.gh=? and(O.sksj="星期三7-8" or O.sksj="星期三5-8"))as km'
    },

    tableThu: {
        show: 'select(select C.km from O,C where O.kh=C.kh and O.xq=? and O.gh=? and(O.sksj="星期四1-2" or O.sksj="星期四1-4"))as km union all select(select C.km from O,C where O.kh=C.kh and O.xq=? and O.gh=? and(O.sksj="星期四 3-4"or O.sksj="星期四1-4") )as km union all select(select C.km from O,C where O.kh=C.kh and O.xq=? and O.gh=? and(O.sksj="星期四5-6" or O.sksj="星期四5-8")) as km union all select(select C.km from O,C where O.kh=C.kh and O.xq=? and O.gh=? and(O.sksj="星期四7-8" or O.sksj="星期四5-8"))as km'
    },

    tableFri: {
        show: 'select(select C.km from O,C where O.kh=C.kh and O.xq=? and O.gh=? and(O.sksj="星期五1-2" or O.sksj="星期五1-4"))as km union all select(select C.km from O,C where O.kh=C.kh and O.xq=? and O.gh=? and(O.sksj="星期五 3-4"or O.sksj="星期五1-4") )as km union all select(select C.km from O,C where O.kh=C.kh and O.xq=? and O.gh=? and(O.sksj="星期五5-6" or O.sksj="星期五5-8")) as km union all select(select C.km from O,C where O.kh=C.kh and O.xq=? and O.gh=? and(O.sksj="星期五7-8" or O.sksj="星期五5-8"))as km'
    },
    stableMon: {
        show: 'select(select C.km from O,C,E where O.kh=C.kh and O.xq=E.xq and O.kh=E.kh and O.gh=E.gh and E.xq=? and E.xh=? and pscj=0 and zpcj=0 and kscj=0 and (O.sksj="星期一1-2" or O.sksj="星期一1-4"))as km union all select(select C.km from O,C,E where O.kh=C.kh and O.xq=E.xq and O.kh=E.kh and O.gh=E.gh and E.xq=? and E.xh=? and pscj=0 and zpcj=0 and kscj=0 and (O.sksj="星期一3-4"or O.sksj="星期一1-4") )as km union all select(select C.km from O,C,E where O.kh=C.kh and O.xq=E.xq and O.kh=E.kh and O.gh=E.gh and E.xq=? and E.xh=? and pscj=0 and zpcj=0 and kscj=0 and (O.sksj="星期一5-6" or O.sksj="星期一5-8")) as km union all select(select C.km from O,C,E where O.kh=C.kh and O.xq=E.xq and O.kh=E.kh and O.gh=E.gh and E.xq=? and E.xh=? and pscj=0 and zpcj=0 and kscj=0 and (O.sksj="星期一7-8" or O.sksj="星期一5-8"))as km'
    },

    stableTue: {
        show: 'select(select C.km from O,C,E where O.kh=C.kh and O.xq=E.xq and O.kh=E.kh and O.gh=E.gh and E.xq=? and E.xh=? and pscj=0 and zpcj=0 and kscj=0 and (O.sksj="星期二1-2" or O.sksj="星期二1-4"))as km union all select(select C.km from O,C,E where O.kh=C.kh and O.xq=E.xq and O.kh=E.kh and O.gh=E.gh and E.xq=? and E.xh=? and pscj=0 and zpcj=0 and kscj=0 and (O.sksj="星期二3-4"or O.sksj="星期二1-4") )as km union all select(select C.km from O,C,E where O.kh=C.kh and O.xq=E.xq and O.kh=E.kh and O.gh=E.gh and E.xq=? and E.xh=? and pscj=0 and zpcj=0 and kscj=0 and (O.sksj="星期二5-6" or O.sksj="星期二5-8")) as km union all select(select C.km from O,C,E where O.kh=C.kh and O.xq=E.xq and O.kh=E.kh and O.gh=E.gh and E.xq=? and E.xh=? and pscj=0 and zpcj=0 and kscj=0 and (O.sksj="星期二7-8" or O.sksj="星期二5-8"))as km'
    },

    stableWed: {
        show: 'select(select C.km from O,C,E where O.kh=C.kh and O.xq=E.xq and O.kh=E.kh and O.gh=E.gh and E.xq=? and E.xh=? and pscj=0 and zpcj=0 and kscj=0 and (O.sksj="星期三1-2" or O.sksj="星期三1-4"))as km union all select(select C.km from O,C,E where O.kh=C.kh and O.xq=E.xq and O.kh=E.kh and O.gh=E.gh and E.xq=? and E.xh=? and pscj=0 and zpcj=0 and kscj=0 and (O.sksj="星期三3-4"or O.sksj="星期三1-4") )as km union all select(select C.km from O,C,E where O.kh=C.kh and O.xq=E.xq and O.kh=E.kh and O.gh=E.gh and E.xq=? and E.xh=? and pscj=0 and zpcj=0 and kscj=0 and (O.sksj="星期三5-6" or O.sksj="星期三5-8")) as km union all select(select C.km from O,C,E where O.kh=C.kh and O.xq=E.xq and O.kh=E.kh and O.gh=E.gh and E.xq=? and E.xh=? and pscj=0 and zpcj=0 and kscj=0 and (O.sksj="星期三7-8" or O.sksj="星期三5-8"))as km'
    },

    stableThu: {
        show: 'select(select C.km from O,C,E where O.kh=C.kh and O.xq=E.xq and O.kh=E.kh and O.gh=E.gh and E.xq=? and E.xh=? and pscj=0 and zpcj=0 and kscj=0 and (O.sksj="星期四1-2" or O.sksj="星期四1-4"))as km union all select(select C.km from O,C,E where O.kh=C.kh and O.xq=E.xq and O.kh=E.kh and O.gh=E.gh and E.xq=? and E.xh=? and pscj=0 and zpcj=0 and kscj=0 and (O.sksj="星期四3-4"or O.sksj="星期四1-4") )as km union all select(select C.km from O,C,E where O.kh=C.kh and O.xq=E.xq and O.kh=E.kh and O.gh=E.gh and E.xq=? and E.xh=? and pscj=0 and zpcj=0 and kscj=0 and (O.sksj="星期四5-6" or O.sksj="星期四5-8")) as km union all select(select C.km from O,C,E where O.kh=C.kh and O.xq=E.xq and O.kh=E.kh and O.gh=E.gh and E.xq=? and E.xh=? and pscj=0 and zpcj=0 and kscj=0 and (O.sksj="星期四7-8" or O.sksj="星期四5-8"))as km'
    },

    stableFri: {
        show: 'select(select C.km from O,C,E where O.kh=C.kh and O.xq=E.xq and O.kh=E.kh and O.gh=E.gh and E.xq=? and E.xh=? and pscj=0 and zpcj=0 and kscj=0 and (O.sksj="星期五1-2" or O.sksj="星期五1-4"))as km union all select(select C.km from O,C,E where O.kh=C.kh and O.xq=E.xq and O.kh=E.kh and O.gh=E.gh and E.xq=? and E.xh=? and pscj=0 and zpcj=0 and kscj=0 and (O.sksj="星期五3-4"or O.sksj="星期五1-4") )as km union all select(select C.km from O,C,E where O.kh=C.kh and O.xq=E.xq and O.kh=E.kh and O.gh=E.gh and E.xq=? and E.xh=? and pscj=0 and zpcj=0 and kscj=0 and (O.sksj="星期五5-6" or O.sksj="星期五5-8")) as km union all select(select C.km from O,C,E where O.kh=C.kh and O.xq=E.xq and O.kh=E.kh and O.gh=E.gh and E.xq=? and E.xh=? and pscj=0 and zpcj=0 and kscj=0 and (O.sksj="星期五7-8" or O.sksj="星期五5-8"))as km'
    }

}

module.exports = sqlMap;

