<?php
include("Basedatos.php");

if (isset($_POST["btnenviar"]) )
{
    //  1 recibir lod datos
    $id = $_POST['id'];
    $nombre = $_POST['nombre'];
    $apellido = $_POST['apellido'];
    $edad = $_POST['edad'];
    $premio = $_POST['premio'];
    

    // 2 crear una copia de la clase bd o es decir crear un objeto de la clase
    $transaccion = new Basedatos();

    // 3 crear una consulta sql para agregar datos
    $consultaSQL="INSERT INTO ganadores(id,nombre,apellido, edad, premio) VALUES 
    (' $id','$nombre','$apellido','$edad','$premio')";

    //4u tilizar el metodo agregar datos
    $transaccion->agregarDatos($consultaSQL);

}
else if (isset($_POST["btnenviar2"]) )
{
    //  1 recibir lod datos
    $id = $_POST['id'];
    $nombre = $_POST['nombre'];
    $apellido = $_POST['apellido'];
    $edad = $_POST['edad'];
    
    

    // 2 crear una copia de la clase bd o es decir crear un objeto de la clase
    $transaccion = new Basedatos();

    // 3 crear una consulta sql para agregar datos
    $consultaSQL="INSERT INTO perdedores(id nombre,apellido, edad ) VALUES 
    (' $id','$nombre','$apellido','$edad')";

    //4u tilizar el metodo agregar datos
    $transaccion->agregarDatos($consultaSQL);

}