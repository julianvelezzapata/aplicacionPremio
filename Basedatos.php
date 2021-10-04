<?php

class Basedatos
{
    //VARIBLES O ATRIBUTOS
    public $usuarioBD="root";
    public $paswoordBD="";


    //CONSTRUCTOR
    public function __construct()
    {

    }

//---------
   


    //FUNCIONES O METODOS
    public function conectarBD()
    {
      
        try
        {
          $datosBD="mysql:host=localhost;dbname=bdganadores";
          //al hacer esto PDO me pide la informacion de la base de datos, despues el usuario y contraseña
          $conexionBD = new PDO($datosBD , $this->usuarioBD,$this->paswoordBD);
          //con this le indico que en la clase hhay un atributo llamado .. y este no tendra $
          return($conexionBD);
      
        }catch(PDOException $error)
        {
        echo($error ->getMessage());
        }
    }
    public function agregarDatos($consultaSQL)
    {
        //1  se debe establecer una conexion a BD 
        $conexionBD=$this->conectarBD();

        // 2 preparar la consulta para insertar datos
        $consultaAgregarDatos = $conexionBD->prepare($consultaSQL);

        // 3 ejecutar la consulta
        $resultado=$consultaAgregarDatos->execute();

        // 4 validar la operacion
        if ($resultado) 
        {
          echo("exito");
        }else 
        {
          echo("error insertando los datos");
        }
    }
    
    public function consultarDatos($consultaSQL)
    {

      //1.Se debe establecer una conexion a BD
      $conexionBD=$this->conectarBD();

      //2.Preparar la consulta para insertar datos
      $consultaBuscarDatos=$conexionBD->prepare($consultaSQL);

      //3.Indicar el metodo para tarer los datos
      $consultaBuscarDatos->setFetchMode(PDO::FETCH_ASSOC);

      //4.Se ejecuta la consulta
      $resultado=$consultaBuscarDatos->execute();

      //5.RETORNE LOS DATOS CONSULTADOS
      return($consultaBuscarDatos->fetchAll());

    }
     

}