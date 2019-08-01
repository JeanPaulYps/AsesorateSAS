$("form").submit(function(event){
    event.preventDefault();
    var s1 = jQuery("input:radio[name=seleccion_p1]:checked").val();
    var s2 = jQuery("input:radio[name=seleccion_p2]:checked").val();
    var s3 = jQuery("input:radio[name=seleccion_p3]:checked").val();
    var s4 = jQuery("input:radio[name=seleccion_p4]:checked").val();
    var s5 = jQuery("input:radio[name=seleccion_p5]:checked").val();
    cedula_tutor = localStorage.getItem("cedula_tutor");
    fetch('https://fathomless-mesa-60059.herokuapp.com/api/calificarTutor',{
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json, text-plain, */*"
        },
        method: 'post',
        credentials: "same-origin",
        body: JSON.stringify({
            r1:s1,
            r2:s2,
            r3:s3,
            r4:s4,
            r5:s5,
            cedula_tutor:cedula_tutor
        })
    }).then((data) => data.json())
    .then(res =>{
        console.log(res.message);
        localStorage.removeItem("cedula_tutor");
        location.replace("http://www.asesorate.tk/frontend/estudiante.html");
    })
    .catch(function(error){
        console.log(error);
    });
})