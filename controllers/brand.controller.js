const {
  createBrandServices,
  getBrandsServices,
  getBrandServices,
  updateBrandServices,
} = require("../services/brand.services");

exports.createBrand = async (req, res, next) => {
  try {
    const result = await createBrandServices(req.body);

    res.status(200).json({
      status: "Success",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Filed",
      error: "Could not create brand",
    });
  }
};

exports.getBrand = async (req, res, next) => {
  try {
    const result = await getBrandsServices();

    res.status(200).json({
      status: "Success",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Filed",
      error: "Could not create brand",
    });
  }
};
exports.getBrandById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const brand = await getBrandServices(id);

    if (!brand) {
      return res.status(400).json({
        status: "failure",
        error: "Could not find brand with id",
      });
    }

    res.status(200).json({
      status: "Success",
      data: brand,
    });
  } catch (error) {
    res.status(400).json({
      status: "Filed",
      error: "Could not create brand",
    });
  }
};

exports.updateBrand = async (req, res, next) => {
  try {
    const { id } = req.params;
    const brand = await updateBrandServices(id, req.body);
    if (!brand.nModified) {
      return res.status(400).json({
        status: "failure",
        error: "Could not update brand with id",
      });
    }
    res.status(200).json({
      status: "Success",
      message: "Successfully updated brand",
    });
  } catch (error) {
    res.status(400).json({
      status: "Filed",
      error: "Could not create brand",
    });
  }
};
